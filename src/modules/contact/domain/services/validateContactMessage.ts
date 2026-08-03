import type { ContactMessage } from '@contact/domain/models/ContactMessage';

export type ContactValidationErrors = Partial<Record<keyof ContactMessage, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactMessage = (message: ContactMessage): ContactValidationErrors => {
  const errors: ContactValidationErrors = {};

  if (message.name.trim().length < 2) {
    errors.name = 'Please enter at least two characters.';
  }
  if (!emailPattern.test(message.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (message.message.trim().length < 20) {
    errors.message = 'Tell me a little more — at least 20 characters.';
  }

  return errors;
};
