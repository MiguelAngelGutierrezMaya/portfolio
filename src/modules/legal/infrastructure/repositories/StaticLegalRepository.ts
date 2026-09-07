import type { LegalRepository } from '@legal/application/ports/LegalRepository';
import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';
import { defaultLocale, type Locale } from '@i18n/domain/Locale';

const englishDocuments: Record<LegalDocumentKey, LegalDocument> = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'How this portfolio collects, uses and protects information submitted through the contact form.',
    lastUpdated: 'August 21, 2026',
    introduction:
      'This policy explains what information is collected when you contact me through this portfolio and how that information is handled.',
    sections: [
      {
        title: 'Information collected',
        paragraphs: [
          'The contact form collects only the information you choose to provide: your name, email address and message. To prevent abuse, a short-lived pseudonymous request key derived from network information is processed without storing the raw address in the rate-limit database.',
        ],
      },
      {
        title: 'How information is used',
        paragraphs: [
          'Your information is used to respond to professional inquiries, discuss potential opportunities and maintain the security and reliability of the website. It is not used for automated decision-making or sold to third parties.',
        ],
      },
      {
        title: 'Service providers',
        paragraphs: [
          'Messages are processed server-side by AWS Lambda and delivered through Amazon Simple Email Service (SES). Amazon Web Services and the destination mailbox provider may process limited information required to host, secure and deliver the message.',
        ],
      },
      {
        title: 'Retention and security',
        paragraphs: [
          'The contact backend does not persist message contents in its rate-limit database. Delivered messages remain in the destination mailbox only as long as reasonably necessary to respond and maintain relevant professional correspondence. Short-lived anti-abuse records expire automatically.',
        ],
      },
      {
        title: 'Your choices and rights',
        paragraphs: [
          'You may request access, correction or deletion of personal information submitted through this site, subject to applicable legal requirements.',
        ],
        items: [
          'Access the information associated with your inquiry',
          'Correct inaccurate contact information',
          'Request deletion of correspondence when legally permitted',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [
          'For privacy questions or requests, email gutierrezmayamiguelangel@gmail.com.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Terms governing access to and use of this personal portfolio website.',
    lastUpdated: 'August 2, 2026',
    introduction:
      'By using this portfolio, you agree to these terms. If you do not agree, please discontinue use of the website.',
    sections: [
      {
        title: 'Purpose of the website',
        paragraphs: [
          'This website presents professional experience, technical capabilities and selected project information. Content is provided for general professional and informational purposes.',
        ],
      },
      {
        title: 'Acceptable use',
        paragraphs: [
          'You may browse and share links to the website for lawful purposes. You may not attempt to disrupt the site, gain unauthorized access, introduce malicious code or misuse the contact form.',
        ],
      },
      {
        title: 'Portfolio content',
        paragraphs: [
          'Project descriptions may refer to private commercial products. They summarize professional contributions without granting rights to confidential materials, source code, trademarks or third-party intellectual property.',
        ],
      },
      {
        title: 'External links',
        paragraphs: [
          'Links to repositories, employers and social platforms are provided for convenience. I do not control and am not responsible for the availability, content or privacy practices of third-party websites.',
        ],
      },
      {
        title: 'No warranties',
        paragraphs: [
          'The website is provided as available without guarantees that it will always be uninterrupted or error-free. To the extent permitted by law, liability for indirect or consequential loss arising from use of the website is excluded.',
        ],
      },
      {
        title: 'Changes and contact',
        paragraphs: [
          'These terms may be updated when the website or its services change. Questions can be sent to gutierrezmayamiguelangel@gmail.com.',
        ],
      },
    ],
  },
};

const spanishDocuments: Record<LegalDocumentKey, LegalDocument> = {
  privacy: {
    title: 'Política de privacidad',
    description:
      'Cómo este portafolio recopila, utiliza y protege la información enviada mediante el formulario de contacto.',
    lastUpdated: '21 de agosto de 2026',
    introduction:
      'Esta política explica qué información se recopila cuando te comunicas conmigo a través de este portafolio y cómo se gestiona.',
    sections: [
      {
        title: 'Información recopilada',
        paragraphs: [
          'El formulario de contacto recopila únicamente la información que decides proporcionar: nombre, correo electrónico y mensaje. Para prevenir abusos, se procesa temporalmente una clave seudónima derivada de información de red, sin almacenar la dirección original en la base de datos de limitación de solicitudes.',
        ],
      },
      {
        title: 'Uso de la información',
        paragraphs: [
          'Tu información se utiliza para responder consultas profesionales, conversar sobre posibles oportunidades y mantener la seguridad y confiabilidad del sitio. No se utiliza para tomar decisiones automatizadas ni se vende a terceros.',
        ],
      },
      {
        title: 'Proveedores de servicios',
        paragraphs: [
          'Los mensajes se procesan del lado del servidor mediante AWS Lambda y se entregan a través de Amazon Simple Email Service (SES). Amazon Web Services y el proveedor del buzón de destino pueden procesar la información limitada necesaria para alojar, proteger y entregar el mensaje.',
        ],
      },
      {
        title: 'Retención y seguridad',
        paragraphs: [
          'El backend de contacto no guarda el contenido de los mensajes en su base de datos de limitación de solicitudes. Los mensajes entregados permanecen en el buzón de destino solo durante el tiempo razonablemente necesario para responder y conservar correspondencia profesional relevante. Los registros temporales contra abuso vencen automáticamente.',
        ],
      },
      {
        title: 'Tus opciones y derechos',
        paragraphs: [
          'Puedes solicitar acceso, corrección o eliminación de la información personal enviada mediante este sitio, de acuerdo con los requisitos legales aplicables.',
        ],
        items: [
          'Acceder a la información asociada con tu consulta',
          'Corregir información de contacto inexacta',
          'Solicitar la eliminación de correspondencia cuando la ley lo permita',
        ],
      },
      {
        title: 'Contacto',
        paragraphs: [
          'Para preguntas o solicitudes de privacidad, escribe a gutierrezmayamiguelangel@gmail.com.',
        ],
      },
    ],
  },
  terms: {
    title: 'Términos de uso',
    description: 'Términos que rigen el acceso y uso de este sitio web de portafolio personal.',
    lastUpdated: '2 de agosto de 2026',
    introduction:
      'Al utilizar este portafolio aceptas estos términos. Si no estás de acuerdo, por favor deja de utilizar el sitio web.',
    sections: [
      {
        title: 'Propósito del sitio web',
        paragraphs: [
          'Este sitio presenta experiencia profesional, capacidades técnicas e información seleccionada de proyectos. El contenido se ofrece con fines profesionales e informativos generales.',
        ],
      },
      {
        title: 'Uso aceptable',
        paragraphs: [
          'Puedes navegar y compartir enlaces al sitio con fines legales. No puedes intentar interrumpirlo, obtener acceso no autorizado, introducir código malicioso ni hacer uso indebido del formulario de contacto.',
        ],
      },
      {
        title: 'Contenido del portafolio',
        paragraphs: [
          'Las descripciones de proyectos pueden hacer referencia a productos comerciales privados. Estas resumen contribuciones profesionales sin otorgar derechos sobre materiales confidenciales, código fuente, marcas ni propiedad intelectual de terceros.',
        ],
      },
      {
        title: 'Enlaces externos',
        paragraphs: [
          'Los enlaces a repositorios, empleadores y plataformas sociales se ofrecen por conveniencia. No controlo ni soy responsable por la disponibilidad, el contenido o las prácticas de privacidad de sitios de terceros.',
        ],
      },
      {
        title: 'Ausencia de garantías',
        paragraphs: [
          'El sitio se proporciona según disponibilidad, sin garantizar que funcione siempre de manera ininterrumpida o sin errores. En la medida permitida por la ley, se excluye la responsabilidad por pérdidas indirectas o consecuentes derivadas de su uso.',
        ],
      },
      {
        title: 'Cambios y contacto',
        paragraphs: [
          'Estos términos pueden actualizarse cuando cambien el sitio o sus servicios. Puedes enviar tus preguntas a gutierrezmayamiguelangel@gmail.com.',
        ],
      },
    ],
  },
};

const documents: Record<Locale, Record<LegalDocumentKey, LegalDocument>> = {
  en: englishDocuments,
  es: spanishDocuments,
};

export class StaticLegalRepository implements LegalRepository {
  getDocument(key: LegalDocumentKey, locale: Locale = defaultLocale): LegalDocument {
    return documents[locale][key];
  }
}
