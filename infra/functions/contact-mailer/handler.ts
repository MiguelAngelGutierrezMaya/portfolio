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
}

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

const parseEvent = (
  event: ContactMailerEvent
): { readonly message: ContactMailerMessage; readonly sourceIp: string } | null => {
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

  return { message, sourceIp };
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

    const emailBody = [
      'New portfolio contact',
      '',
      `Name: ${parsed.message.name}`,
      `Email: ${parsed.message.email}`,
      '',
      'Message:',
      parsed.message.message,
    ].join('\n');

    try {
      await executeEmail(
        new SendEmailCommand({
          FromEmailAddress: senderEmail,
          Destination: { ToAddresses: [recipientEmail] },
          ReplyToAddresses: [parsed.message.email],
          Content: {
            Simple: {
              Subject: { Data: 'New Migudev portfolio contact', Charset: 'UTF-8' },
              Body: { Text: { Data: emailBody, Charset: 'UTF-8' } },
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
