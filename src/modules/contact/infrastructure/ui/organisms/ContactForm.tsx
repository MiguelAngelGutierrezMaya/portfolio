import { useEffect, useRef, useState, type SubmitEvent } from 'react';

import type { Locale } from '@i18n/domain/Locale';
import type { ContactFormCopy } from '@i18n/infrastructure/uiCopy';
import type { ContactGateway } from '@contact/application/ports/ContactGateway';
import { SendContactMessage } from '@contact/application/use-cases/SendContactMessage';
import type { ContactMessage } from '@contact/domain/models/ContactMessage';
import {
  validateContactMessage,
  type ContactValidationErrors,
} from '@contact/domain/services/validateContactMessage';
import { createSameOriginContactGateway } from '@contact/infrastructure/gateways/SameOriginContactGateway';

import './ContactForm.css';

interface ContactFormProps {
  gateway?: ContactGateway;
  locale: Locale;
  copy: ContactFormCopy;
}

const defaultGateway = createSameOriginContactGateway();

const ContactForm = ({ gateway = defaultGateway, locale, copy }: ContactFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const mountedAtRef = useRef(0);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    mountedAtRef.current = Date.now();
    return () => abortRef.current?.abort();
  }, []);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const honeypot = String(formData.get('company') ?? '');
    if (honeypot) {
      setStatus('success');
      setFeedback(copy.success);
      formRef.current?.reset();
      return;
    }

    const values: ContactMessage = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };
    const validationErrors = validateContactMessage(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setFeedback(copy.invalid);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus('sending');
    setFeedback(copy.submitting);

    const result = await SendContactMessage.execute(gateway, values, controller.signal, {
      honeypot,
      elapsedMs: Date.now() - mountedAtRef.current,
      locale,
    });
    if (controller.signal.aborted || abortRef.current !== controller) return;

    setStatus(result.success ? 'success' : 'error');
    setFeedback(
      result.success
        ? copy.success
        : result.code === 'rate_limited'
          ? copy.rateLimited
          : copy.unavailable
    );

    if (result.success) {
      formRef.current?.reset();
      setErrors({});
    }
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="contact-name">{copy.nameLabel}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            maxLength={80}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name ? (
            <span id="contact-name-error" className="field__error">
              {errors.name === 'name_too_short'
                ? copy.errors.nameTooShort
                : copy.errors.nameTooLong}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-email">{copy.emailLabel}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={254}
            inputMode="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? (
            <span id="contact-email-error" className="field__error">
              {errors.email === 'email_invalid'
                ? copy.errors.emailInvalid
                : copy.errors.emailTooLong}
            </span>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-message">{copy.messageLabel}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={4000}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <span id="contact-message-error" className="field__error">
            {errors.message === 'message_too_short'
              ? copy.errors.messageTooShort
              : copy.errors.messageTooLong}
          </span>
        ) : null}
      </div>

      <div className="field field--honeypot" aria-hidden="true">
        <label htmlFor="contact-company">{copy.companyLabel}</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          maxLength={200}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__footer">
        <button className="button button--primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? copy.submitting : copy.submit}
          <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status form-status--${status}`} role="status" aria-live="polite">
          {feedback || copy.idle}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
