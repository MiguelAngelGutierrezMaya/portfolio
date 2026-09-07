import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import type { Handler } from 'aws-lambda';
import { createHash } from 'node:crypto';

const rateLimitWindowSeconds = 15 * 60;
const rateLimitAttempts = 3;
const deduplicationWindowSeconds = 5 * 60;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactMailerEvent {
  readonly message?: unknown;
  readonly sourceIp?: unknown;
  readonly locale?: unknown;
}

type ContactLocale = 'en' | 'es';

interface ContactMailerMessage {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

interface ContactMailerResult {
  readonly status: 'accepted' | 'duplicate' | 'rate_limited' | 'unavailable';
}

interface ContactMailerDependencies {
  readonly rateLimitTable: string;
  readonly recipientEmail: string;
  readonly region: string;
  readonly senderEmail: string;
  readonly now?: () => number;
  readonly sendDynamo?: (
    command: DeleteItemCommand | PutItemCommand | UpdateItemCommand
  ) => Promise<unknown>;
  readonly sendEmail?: (command: SendEmailCommand) => Promise<unknown>;
}

type ContactMailer = (event: ContactMailerEvent) => Promise<ContactMailerResult>;

const sha256 = (value: string): string => createHash('sha256').update(value).digest('hex');

const replaceControlCharacters = (value: string, preserveWhitespace: boolean): string =>
  Array.from(value, character => {
    const codePoint = character.codePointAt(0) ?? 0;
    const isPreservedWhitespace = preserveWhitespace && [9, 10, 13].includes(codePoint);
    return codePoint >= 32 && codePoint !== 127
      ? character
      : isPreservedWhitespace
        ? character
        : ' ';
  }).join('');

const normalizeName = (value: string): string =>
  replaceControlCharacters(value, false).replace(/\s+/g, ' ').trim();

const normalizeMessage = (value: string): string => replaceControlCharacters(value, true).trim();

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    character =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character] ?? character
  );

export const buildContactEmail = (
  message: ContactMailerMessage,
  locale: ContactLocale
): { readonly subject: string; readonly text: string; readonly html: string } => {
  const safeName = escapeHtml(message.name);
  const safeEmail = escapeHtml(message.email);
  const safeMessage = escapeHtml(message.message).replaceAll(/\r?\n/g, '<br />');
  const localeLabel = locale === 'es' ? 'ESPAÑOL' : 'ENGLISH';
  const text = [
    'Nueva conversación desde Migudev',
    '',
    `Nombre: ${message.name}`,
    `Correo: ${message.email}`,
    `Idioma de la página: ${localeLabel}`,
    '',
    'Mensaje:',
    message.message,
    '',
    `Responder: mailto:${message.email}`,
  ].join('\n');
  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nueva conversación desde Migudev</title>
  </head>
  <body style="margin:0;padding:0;background:#090b0f;color:#f7f7f8;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Nueva oportunidad recibida desde el portafolio de Migudev.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#090b0f;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;border:1px solid #30343d;border-radius:24px;background:#11141b;overflow:hidden;">
            <tr>
              <td style="padding:32px;background:linear-gradient(135deg,#1b1f29 0%,#12151c 64%,#281719 100%);border-bottom:1px solid #30343d;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <div style="display:inline-block;width:48px;height:48px;line-height:48px;border-radius:15px;background:#e8494f;color:#ffffff;font-size:17px;font-weight:800;text-align:center;box-shadow:0 10px 30px rgba(232,73,79,.24);">MG</div>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block;border:1px solid rgba(232,73,79,.42);border-radius:999px;background:rgba(232,73,79,.12);color:#ffb3b6;font-size:11px;font-weight:700;letter-spacing:.12em;padding:8px 12px;">PORTFOLIO · ${localeLabel}</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:28px 0 8px;color:#ff777c;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">Nueva oportunidad</p>
                <h1 style="margin:0;color:#ffffff;font-size:32px;line-height:1.16;letter-spacing:-.04em;">Alguien quiere conversar contigo.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;color:#858b98;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Contacto</p>
                <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${safeName}</p>
                <p style="margin:6px 0 0;color:#b8bdc8;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#ff777c;text-decoration:none;">${safeEmail}</a></p>

                <div style="height:1px;margin:28px 0;background:#30343d;"></div>

                <p style="margin:0 0 12px;color:#858b98;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Mensaje</p>
                <div style="border-left:3px solid #e8494f;border-radius:0 14px 14px 0;background:#171b23;color:#e8e9ec;font-size:16px;line-height:1.7;padding:20px 22px;">${safeMessage}</div>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:999px;background:#e8494f;">
                      <a href="mailto:${safeEmail}" style="display:inline-block;color:#ffffff;font-size:14px;font-weight:750;padding:13px 22px;text-decoration:none;">Responder por correo ↗</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #30343d;background:#0d1016;color:#747a87;font-size:11px;line-height:1.6;">
                Enviado de forma segura desde migudev.com mediante AWS Lambda y Amazon SES. Este correo no incluye recursos externos ni seguimiento.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: 'Nueva conversación desde Migudev', text, html };
};

const parseEvent = (
  event: ContactMailerEvent
): {
  readonly message: ContactMailerMessage;
  readonly sourceIp: string;
  readonly locale: ContactLocale;
} | null => {
  if (!event || typeof event.sourceIp !== 'string') return null;
  if (!event.message || typeof event.message !== 'object' || Array.isArray(event.message))
    return null;

  const candidate = event.message as Record<string, unknown>;
  if (
    typeof candidate.name !== 'string' ||
    typeof candidate.email !== 'string' ||
    typeof candidate.message !== 'string'
  ) {
    return null;
  }

  const message = {
    name: normalizeName(candidate.name),
    email: candidate.email.trim().toLowerCase(),
    message: normalizeMessage(candidate.message),
  };
  const sourceIp = event.sourceIp.trim();

  if (
    message.name.length < 2 ||
    message.name.length > 80 ||
    message.email.length > 254 ||
    !emailPattern.test(message.email) ||
    message.message.length < 20 ||
    message.message.length > 4000 ||
    sourceIp.length === 0 ||
    sourceIp.length > 128
  ) {
    return null;
  }

  const locale: ContactLocale = event.locale === 'es' ? 'es' : 'en';
  return { message, sourceIp, locale };
};

const isConditionalFailure = (error: unknown): boolean =>
  error instanceof Error && error.name === 'ConditionalCheckFailedException';

export const createContactMailer = ({
  rateLimitTable,
  recipientEmail,
  region,
  senderEmail,
  now = Date.now,
  sendDynamo,
  sendEmail,
}: ContactMailerDependencies): ContactMailer => {
  if (!rateLimitTable) throw new Error('CONTACT_RATE_LIMIT_TABLE is required');
  if (!emailPattern.test(senderEmail)) throw new Error('CONTACT_SENDER_EMAIL is required');
  if (!emailPattern.test(recipientEmail)) throw new Error('CONTACT_RECIPIENT_EMAIL is required');

  const dynamoClient = new DynamoDBClient({ region });
  const sesClient = new SESv2Client({ region });
  const executeDynamo =
    sendDynamo ??
    (command => {
      if (command instanceof DeleteItemCommand) return dynamoClient.send(command);
      if (command instanceof PutItemCommand) return dynamoClient.send(command);
      return dynamoClient.send(command);
    });
  const executeEmail = sendEmail ?? (command => sesClient.send(command));

  return async event => {
    const parsed = parseEvent(event);
    if (!parsed) return { status: 'unavailable' };

    const nowSeconds = Math.floor(now() / 1000);
    const rateWindow = Math.floor(nowSeconds / rateLimitWindowSeconds);
    const sourceHash = sha256(parsed.sourceIp);
    const rateKey = `rate#${sourceHash}#${rateWindow}`;

    try {
      await executeDynamo(
        new UpdateItemCommand({
          TableName: rateLimitTable,
          Key: { rateKey: { S: rateKey } },
          UpdateExpression: 'SET expiresAt = :expiresAt ADD attempts :one',
          ConditionExpression: 'attribute_not_exists(attempts) OR attempts < :limit',
          ExpressionAttributeValues: {
            ':expiresAt': { N: String(nowSeconds + rateLimitWindowSeconds * 2) },
            ':one': { N: '1' },
            ':limit': { N: String(rateLimitAttempts) },
          },
        })
      );
    } catch (error: unknown) {
      if (isConditionalFailure(error)) return { status: 'rate_limited' };
      return { status: 'unavailable' };
    }

    const deduplicationWindow = Math.floor(nowSeconds / deduplicationWindowSeconds);
    const deduplicationKey = `dedupe#${sha256(
      `${sourceHash}:${parsed.message.email}:${parsed.message.message}:${deduplicationWindow}`
    )}`;

    try {
      await executeDynamo(
        new PutItemCommand({
          TableName: rateLimitTable,
          Item: {
            rateKey: { S: deduplicationKey },
            expiresAt: { N: String(nowSeconds + deduplicationWindowSeconds * 2) },
          },
          ConditionExpression: 'attribute_not_exists(rateKey)',
        })
      );
    } catch (error: unknown) {
      if (isConditionalFailure(error)) return { status: 'duplicate' };
      return { status: 'unavailable' };
    }

    const email = buildContactEmail(parsed.message, parsed.locale);

    try {
      await executeEmail(
        new SendEmailCommand({
          FromEmailAddress: senderEmail,
          Destination: { ToAddresses: [recipientEmail] },
          ReplyToAddresses: [parsed.message.email],
          Content: {
            Simple: {
              Subject: { Data: email.subject, Charset: 'UTF-8' },
              Body: {
                Text: { Data: email.text, Charset: 'UTF-8' },
                Html: { Data: email.html, Charset: 'UTF-8' },
              },
            },
          },
          EmailTags: [{ Name: 'source', Value: 'migudev-portfolio' }],
        })
      );
      return { status: 'accepted' };
    } catch {
      try {
        await executeDynamo(
          new DeleteItemCommand({
            TableName: rateLimitTable,
            Key: { rateKey: { S: deduplicationKey } },
            ConditionExpression: 'attribute_exists(rateKey)',
          })
        );
      } catch {
        // The delivery error remains the only failure exposed to the caller.
      }
      return { status: 'unavailable' };
    }
  };
};

let runtimeHandler: ContactMailer | undefined;

export const handler: Handler<ContactMailerEvent, ContactMailerResult> = async event => {
  runtimeHandler ??= createContactMailer({
    rateLimitTable: process.env.CONTACT_RATE_LIMIT_TABLE ?? '',
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL ?? '',
    region: process.env.AWS_REGION ?? 'us-east-2',
    senderEmail: process.env.CONTACT_SENDER_EMAIL ?? '',
  });

  return runtimeHandler(event);
};
