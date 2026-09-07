import type { ContactMessage } from '@contact/domain/models/ContactMessage';

export type ContactValidationErrorCode =
  | 'name_too_short'
  | 'name_too_long'
  | 'email_invalid'
  | 'email_too_long'
  | 'message_too_short'
  | 'message_too_long';

export type ContactValidationErrors = Partial<
  Record<keyof ContactMessage, ContactValidationErrorCode>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = {
  name: 80,
  email: 254,
  message: 4000,
} as const;

export const validateContactMessage = (message: ContactMessage): ContactValidationErrors => {
  const errors: ContactValidationErrors = {};

  if (message.name.trim().length < 2) {
    errors.name = 'name_too_short';
  } else if (message.name.trim().length > limits.name) {
    errors.name = 'name_too_long';
  }
  if (!emailPattern.test(message.email.trim())) {
    errors.email = 'email_invalid';
  } else if (message.email.trim().length > limits.email) {
    errors.email = 'email_too_long';
  }
  if (message.message.trim().length < 20) {
    errors.message = 'message_too_short';
  } else if (message.message.trim().length > limits.message) {
    errors.message = 'message_too_long';
  }

  return errors;
};
