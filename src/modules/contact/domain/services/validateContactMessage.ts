import type { ContactMessage } from '@contact/domain/models/ContactMessage';

export type ContactValidationErrors = Partial<Record<keyof ContactMessage, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = {
  name: 80,
  email: 254,
  message: 4000,
} as const;

export const validateContactMessage = (message: ContactMessage): ContactValidationErrors => {
  const errors: ContactValidationErrors = {};

  if (message.name.trim().length < 2) {
    errors.name = 'Please enter at least two characters.';
  } else if (message.name.trim().length > limits.name) {
    errors.name = `Please keep your name under ${limits.name} characters.`;
  }
  if (!emailPattern.test(message.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  } else if (message.email.trim().length > limits.email) {
    errors.email = 'Please enter a shorter email address.';
  }
  if (message.message.trim().length < 20) {
    errors.message = 'Tell me a little more — at least 20 characters.';
  } else if (message.message.trim().length > limits.message) {
    errors.message = `Please keep your message under ${limits.message} characters.`;
  }

  return errors;
};
