import { useEffect, useRef, useState, type SubmitEvent } from 'react';

import type { ContactGateway } from '@contact/application/ports/ContactGateway';
import { SendContactMessage } from '@contact/application/use-cases/SendContactMessage';
import type { ContactMessage } from '@contact/domain/models/ContactMessage';
import {
  validateContactMessage,
  type ContactValidationErrors,
} from '@contact/domain/services/validateContactMessage';
import { createHttpContactGateway } from '@contact/infrastructure/gateways/HttpContactGateway';

import './ContactForm.css';

interface ContactFormProps {
  gateway?: ContactGateway;
}

const defaultGateway = createHttpContactGateway();

const ContactForm = ({ gateway = defaultGateway }: ContactFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => () => abortRef.current?.abort(), []);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get('company')) return;

    const values: ContactMessage = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };
    const validationErrors = validateContactMessage(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setFeedback('Review the highlighted fields and try again.');
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus('sending');
    setFeedback('Sending your message…');

    const result = await SendContactMessage.execute(gateway, values, controller.signal);
    if (controller.signal.aborted || abortRef.current !== controller) return;

    setStatus(result.success ? 'success' : 'error');
    setFeedback(result.message);

    if (result.success) {
      formRef.current?.reset();
      setErrors({});
    }
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name ? (
            <span id="contact-name-error" className="field__error">
              {errors.name}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? (
            <span id="contact-email-error" className="field__error">
              {errors.email}
            </span>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-message">Project or opportunity</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="What are you building, and how can I help?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <span id="contact-message-error" className="field__error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="field field--honeypot" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__footer">
        <button className="button button--primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Start a conversation'}
          <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status form-status--${status}`} role="status" aria-live="polite">
          {feedback || 'Usually replies within two business days.'}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
