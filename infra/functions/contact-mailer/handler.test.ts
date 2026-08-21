import { DeleteItemCommand, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { SendEmailCommand } from '@aws-sdk/client-sesv2';
import { describe, expect, it, vi } from 'vitest';

import { createContactMailer } from './handler';

const validEvent = {
  sourceIp: '198.51.100.24',
  message: {
    name: 'Miguel Example',
    email: 'MIGUEL@EXAMPLE.COM',
    message: 'I would like to discuss a secure product engineering opportunity.',
  },
};

const conditionalFailure = () =>
  Object.assign(new Error('conditional request failed'), {
    name: 'ConditionalCheckFailedException',
  });

const createDependencies = () => ({
  rateLimitTable: 'contact-rate-limit',
  recipientEmail: 'gutierrezmayamiguelangel@gmail.com',
  region: 'us-east-2',
  senderEmail: 'gutierrezmayamiguelangel@gmail.com',
  now: () => Date.UTC(2026, 7, 21, 12, 0, 0),
});

describe('contact mailer Lambda', () => {
  it('rate limits, deduplicates and sends a text-only SES message', async () => {
    const sendDynamo = vi.fn().mockResolvedValue({});
    const sendEmail = vi.fn().mockResolvedValue({ MessageId: 'private-message-id' });
    const handler = createContactMailer({ ...createDependencies(), sendDynamo, sendEmail });

    await expect(handler(validEvent)).resolves.toEqual({ status: 'accepted' });

    expect(sendDynamo.mock.calls[0]?.[0]).toBeInstanceOf(UpdateItemCommand);
    expect(sendDynamo.mock.calls[1]?.[0]).toBeInstanceOf(PutItemCommand);
    const persistedSecurityMetadata = JSON.stringify(
      sendDynamo.mock.calls.map(([command]) => command.input)
    );
    expect(persistedSecurityMetadata).not.toContain(validEvent.sourceIp);
    expect(persistedSecurityMetadata).not.toContain(validEvent.message.email);
    expect(persistedSecurityMetadata).not.toContain(validEvent.message.message);

    const emailCommand = sendEmail.mock.calls[0]?.[0];
    expect(emailCommand).toBeInstanceOf(SendEmailCommand);
    expect(emailCommand.input).toMatchObject({
      FromEmailAddress: 'gutierrezmayamiguelangel@gmail.com',
      Destination: { ToAddresses: ['gutierrezmayamiguelangel@gmail.com'] },
      ReplyToAddresses: ['miguel@example.com'],
      Content: {
        Simple: {
          Subject: { Data: 'New Migudev portfolio contact', Charset: 'UTF-8' },
        },
      },
    });
    expect(emailCommand.input.Content).not.toHaveProperty('Raw');
    expect(emailCommand.input.Content).not.toHaveProperty('Simple.Body.Html');
  });

  it('fails closed for malformed events without calling AWS services', async () => {
    const sendDynamo = vi.fn();
    const sendEmail = vi.fn();
    const handler = createContactMailer({ ...createDependencies(), sendDynamo, sendEmail });

    await expect(handler({ sourceIp: '', message: {} })).resolves.toEqual({
      status: 'unavailable',
    });
    expect(sendDynamo).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('enforces the atomic request limit before sending', async () => {
    const sendDynamo = vi.fn().mockRejectedValueOnce(conditionalFailure());
    const sendEmail = vi.fn();
    const handler = createContactMailer({ ...createDependencies(), sendDynamo, sendEmail });

    await expect(handler(validEvent)).resolves.toEqual({ status: 'rate_limited' });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('suppresses duplicate messages inside the deduplication window', async () => {
    const sendDynamo = vi
      .fn()
      .mockResolvedValueOnce({})
      .mockRejectedValueOnce(conditionalFailure());
    const sendEmail = vi.fn();
    const handler = createContactMailer({ ...createDependencies(), sendDynamo, sendEmail });

    await expect(handler(validEvent)).resolves.toEqual({ status: 'duplicate' });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('returns a generic failure when SES is unavailable', async () => {
    const sendDynamo = vi.fn().mockResolvedValue({});
    const handler = createContactMailer({
      ...createDependencies(),
      sendDynamo,
      sendEmail: vi.fn().mockRejectedValue(new Error('sensitive SES failure')),
    });

    await expect(handler(validEvent)).resolves.toEqual({ status: 'unavailable' });
    expect(sendDynamo.mock.calls[2]?.[0]).toBeInstanceOf(DeleteItemCommand);
  });

  it('requires the security-sensitive runtime configuration', () => {
    expect(() => createContactMailer({ ...createDependencies(), rateLimitTable: '' })).toThrow(
      'CONTACT_RATE_LIMIT_TABLE is required'
    );
    expect(() => createContactMailer({ ...createDependencies(), senderEmail: '' })).toThrow(
      'CONTACT_SENDER_EMAIL is required'
    );
  });
});
