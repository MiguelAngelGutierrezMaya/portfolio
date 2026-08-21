import type {
  ContactGateway,
  ContactGatewayContext,
} from '@contact/application/ports/ContactGateway';
import type { ContactMessage, ContactResult } from '@contact/domain/models/ContactMessage';
import { InvokeCommand, LambdaClient, type InvokeCommandOutput } from '@aws-sdk/client-lambda';

interface LambdaContactGatewayConfig {
  readonly functionName: string;
  readonly region: string;
  readonly invoke?: (command: InvokeCommand, signal?: AbortSignal) => Promise<InvokeCommandOutput>;
}

interface ContactMailerResponse {
  readonly status?: unknown;
}

const unavailableResult: ContactResult = {
  success: false,
  code: 'unavailable',
  message: 'The contact service is temporarily unavailable.',
};

const parseMailerResponse = (payload: Uint8Array | undefined): ContactMailerResponse => {
  if (!payload) return {};

  try {
    return JSON.parse(new TextDecoder().decode(payload)) as ContactMailerResponse;
  } catch {
    return {};
  }
};

export class LambdaContactGateway implements ContactGateway {
  private readonly functionName: string;
  private readonly invoke: NonNullable<LambdaContactGatewayConfig['invoke']>;

  constructor({ functionName, region, invoke }: LambdaContactGatewayConfig) {
    this.functionName = functionName;
    const client = new LambdaClient({ region });
    this.invoke = invoke ?? ((command, signal) => client.send(command, { abortSignal: signal }));
  }

  async send(
    message: ContactMessage,
    signal?: AbortSignal,
    context: ContactGatewayContext = {}
  ): Promise<ContactResult> {
    if (!this.functionName || !context.sourceIp) return unavailableResult;

    try {
      const response = await this.invoke(
        new InvokeCommand({
          FunctionName: this.functionName,
          InvocationType: 'RequestResponse',
          LogType: 'None',
          Payload: new TextEncoder().encode(
            JSON.stringify({ message, sourceIp: context.sourceIp })
          ),
        }),
        signal
      );

      if (response.FunctionError) return unavailableResult;

      const result = parseMailerResponse(response.Payload);
      if (result.status === 'accepted' || result.status === 'duplicate') {
        return {
          success: true,
          code: 'accepted',
          message: 'Message accepted for delivery.',
        };
      }
      if (result.status === 'rate_limited') {
        return {
          success: false,
          code: 'rate_limited',
          message: 'Please wait before sending another message.',
        };
      }

      return unavailableResult;
    } catch {
      return unavailableResult;
    }
  }
}

export const createLambdaContactGateway = (): LambdaContactGateway =>
  new LambdaContactGateway({
    functionName: process.env.CONTACT_MAILER_FUNCTION ?? '',
    region: process.env.CONTACT_REGION ?? process.env.AWS_REGION ?? 'us-east-2',
  });
