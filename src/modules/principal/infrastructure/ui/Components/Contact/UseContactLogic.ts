//
// React dependencies
//
import { useEffect, useRef, useState } from 'react';

//
// Use cases
//
import { RegexUseCases } from '@shared/application/RegexUseCases';
import { ContactUseCases } from '@principal/application/ContactUseCases';
import { ToastUseCases } from '@shared/application/ToastUseCases';

//
// Models
//
import type {
  DataToSendEmail,
  EmailTemplate,
} from '@principal/models/controllers/ContactController';

//
// Constants
//
import { EmailRegex } from '@shared/infrastructure/utils/regex/EmailRegext';

//
// Controllers
//
import { ContactController } from '@principal/infrastructure/controllers/ContactController';
import { ToastController } from '@shared/infrastructure/controllers/ToastController';
import {
  NotEmpty,
  OnlyNumberLettersSpaceAndMin3Lenght,
} from '@shared/infrastructure/utils/regex/CustomRegex';

const emailRegex: EmailRegex = new EmailRegex();
const customRegex: OnlyNumberLettersSpaceAndMin3Lenght = new OnlyNumberLettersSpaceAndMin3Lenght();
const notEmptyRegex: NotEmpty = new NotEmpty();
const contactController = new ContactController();
const toastController: ToastController = new ToastController();

export const useContactLogic = () => {
  //
  // Hooks
  //
  const [isIntersecting, setIntersecting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    message: false,
  });
  const [isSending, setIsSending] = useState(false);
  const divElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divElement.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!isIntersecting && entry.isIntersecting) {
        setIntersecting(entry.isIntersecting);
      }
    });

    observer.observe(divElement.current);

    return () => {
      observer.disconnect();
    };
  }, [isIntersecting]);

  //
  // Methods
  //
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const errs = structuredClone(errors);

    errs.name = !RegexUseCases.validate(customRegex, (data.name || '').toString());
    errs.email = !RegexUseCases.validate(emailRegex, (data.email || '').toString());
    errs.message = !RegexUseCases.validate(notEmptyRegex, (data.message || '').toString());

    setErrors(structuredClone(errs));

    if (errs.name || errs.email || errs.message) {
      return;
    }

    setIsSending(true);

    const PUBLIC_EMAIL_SERVICE_ID = import.meta.env.PUBLIC_EMAIL_SERVICE_ID;
    const PUBLIC_EMAIL_TEMPLATE_ID = import.meta.env.PUBLIC_EMAIL_TEMPLATE_ID;
    const PUBLIC_EMAIL_USER_ID = import.meta.env.PUBLIC_EMAIL_USER_ID;

    const emailTemplate: EmailTemplate = {
      message: data.message.toString(),
      from_name: `${data.name.toString()} - (${data.email.toString()})`,
      to_name: 'Miguel Angel',
    };

    const dataToSendEmail: DataToSendEmail = {
      service_id: PUBLIC_EMAIL_SERVICE_ID,
      template_id: PUBLIC_EMAIL_TEMPLATE_ID,
      user_id: PUBLIC_EMAIL_USER_ID,
      template_params: emailTemplate,
    };

    const isSended: boolean = await ContactUseCases.sendEmail(contactController, dataToSendEmail);

    if (isSended) {
      ToastUseCases.ShowSuccess(
        toastController,
        'Thanks for contacting me! I will respond as soon as possible.'
      );
      const form: HTMLFormElement = document.getElementById('contact-form') as HTMLFormElement;
      form.reset();
    } else {
      ToastUseCases.ShowError(toastController, 'Error sending email');
    }

    setIsSending(false);
  };

  return {
    isIntersecting,
    divElement,
    errors,
    isSending,
    onSubmit,
  };
};
