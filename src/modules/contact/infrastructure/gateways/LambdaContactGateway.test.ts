import { InvokeCommand } from '@aws-sdk/client-lambda';
import { describe, expect, it, vi } from 'vitest';

import { LambdaContactGateway } from './LambdaContactGateway';

const message = {
  name: 'Miguel',
  email: 'miguel@example.com',
  message: 'A detailed product engineering opportunity.',
};

const payload = (status: string) => new TextEncoder().encode(JSON.stringify({ status }));

describe('LambdaContactGateway', () => {
  it('invokes the private Lambda synchronously without logs', async () => {
    const invoke = vi.fn().mockResolvedValue({ Payload: payload('accepted') });
    const gateway = new LambdaContactGateway({
      functionName: 'private-contact-mailer',
      region: 'us-east-2',
      invoke,
    });

    await expect(
      gateway.send(message, undefined, { sourceIp: '198.51.100.24' })
    ).resolves.toMatchObject({ success: true, code: 'accepted' });

    const command = invoke.mock.calls[0]?.[0];
    expect(command).toBeInstanceOf(InvokeCommand);
    expect(command.input).toMatchObject({
      FunctionName: 'private-contact-mailer',
      InvocationType: 'RequestResponse',
      LogType: 'None',
    });
    expect(JSON.parse(new TextDecoder().decode(command.input.Payload))).toEqual({
      message,
      sourceIp: '198.51.100.24',
    });
  });

  it('maps private rate limiting without exposing the function response', async () => {
    const gateway = new LambdaContactGateway({
      functionName: 'private-contact-mailer',
      region: 'us-east-2',
      invoke: vi.fn().mockResolvedValue({ Payload: payload('rate_limited') }),
    });

    await expect(gateway.send(message, undefined, { sourceIp: '198.51.100.24' })).resolves.toEqual({
      success: false,
      code: 'rate_limited',
      message: 'Please wait before sending another message.',
    });
  });

  it('fails closed when configuration or invocation is unavailable', async () => {
    const invoke = vi.fn();
    const gateway = new LambdaContactGateway({ functionName: '', region: 'us-east-2', invoke });

    await expect(gateway.send(message, undefined, { sourceIp: '198.51.100.24' })).resolves.toEqual({
      success: false,
      code: 'unavailable',
      message: 'The contact service is temporarily unavailable.',
    });
    expect(invoke).not.toHaveBeenCalled();
  });
});
