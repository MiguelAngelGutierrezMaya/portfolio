import type { LegalRepository } from '@legal/application/ports/LegalRepository';
import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';

const documents: Record<LegalDocumentKey, LegalDocument> = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'How this portfolio collects, uses and protects information submitted through the contact form.',
    lastUpdated: 'August 2, 2026',
    introduction:
      'This policy explains what information is collected when you contact me through this portfolio and how that information is handled.',
    sections: [
      {
        title: 'Information collected',
        paragraphs: [
          'The contact form collects only the information you choose to provide: your name, email address and message. Basic technical request logs may also be processed by the hosting and email providers for security and service delivery.',
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
          'Messages are transmitted through an email delivery provider. Hosting, storage and delivery providers may process limited technical information as required to operate their services.',
        ],
      },
      {
        title: 'Retention and security',
        paragraphs: [
          'Messages are retained only as long as reasonably necessary to respond and maintain relevant professional correspondence. Reasonable technical safeguards are used, but no internet transmission method can guarantee absolute security.',
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

export class StaticLegalRepository implements LegalRepository {
  getDocument(key: LegalDocumentKey): LegalDocument {
    return documents[key];
  }
}
