import type { Locale } from '@i18n/domain/Locale';

export interface ContactFormCopy {
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly messageLabel: string;
  readonly messagePlaceholder: string;
  readonly companyLabel: string;
  readonly submit: string;
  readonly submitting: string;
  readonly idle: string;
  readonly success: string;
  readonly invalid: string;
  readonly rateLimited: string;
  readonly unavailable: string;
  readonly cancelled: string;
  readonly errors: {
    readonly nameTooShort: string;
    readonly nameTooLong: string;
    readonly emailInvalid: string;
    readonly emailTooLong: string;
    readonly messageTooShort: string;
    readonly messageTooLong: string;
  };
}

export interface ProjectExplorerCopy {
  readonly filterLabel: string;
  readonly filters: Record<'All' | 'Frontend' | 'Backend' | 'Mobile', string>;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showing: string;
  readonly of: string;
  readonly projects: string;
  readonly selectedWork: string;
  readonly viewRepository: string;
  readonly privateProduct: string;
  readonly showAll: string;
  readonly noMatchTitle: string;
  readonly noMatchDescription: string;
  readonly viewImagePrefix: string;
  readonly viewImageSuffix: string;
  readonly viewLarger: string;
  readonly closeImagePrefix: string;
  readonly technologies: string;
}

export interface PortfolioUiCopy {
  readonly localeName: string;
  readonly languageSelector: string;
  readonly skipToContent: string;
  readonly primaryNavigation: string;
  readonly mobileNavigation: string;
  readonly openNavigation: string;
  readonly heroSocialProfiles: string;
  readonly footerSocialProfiles: string;
  readonly findMeOnline: string;
  readonly brandHome: string;
  readonly whatsapp: string;
  readonly opensNewTab: string;
  readonly legalNavigation: string;
  readonly capabilities: string;
  readonly technologies: string;
  readonly profileDock: {
    readonly region: string;
    readonly connect: string;
    readonly viewProfile: string;
    readonly closeProfile: string;
  };
  readonly productSystem: {
    readonly status: string;
    readonly core: string;
    readonly coreValue: string;
    readonly interfaces: string;
    readonly services: string;
    readonly delivery: string;
    readonly nativeFlows: string;
    readonly eyebrow: string;
    readonly caption: string;
  };
  readonly contactForm: ContactFormCopy;
  readonly projectExplorer: ProjectExplorerCopy;
  readonly legal: {
    readonly back: string;
    readonly eyebrow: string;
    readonly lastUpdated: string;
  };
  readonly metadata: {
    readonly homeTitle: string;
    readonly homeDescription: string;
    readonly portfolioAlternateName: string;
    readonly ogImageAlt: string;
    readonly professionalInquiries: string;
    readonly present: string;
  };
}

const copies: Record<Locale, PortfolioUiCopy> = {
  en: {
    localeName: 'English',
    languageSelector: 'Language',
    skipToContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    mobileNavigation: 'Mobile navigation',
    openNavigation: 'Open navigation',
    heroSocialProfiles: 'Hero social profiles',
    footerSocialProfiles: 'Footer social profiles',
    findMeOnline: 'Find me online',
    brandHome: 'home',
    whatsapp: 'WhatsApp',
    opensNewTab: 'opens in a new tab',
    legalNavigation: 'Legal',
    capabilities: 'capabilities',
    technologies: 'technologies',
    profileDock: {
      region: 'Quick contact with Miguel',
      connect: "Let's connect",
      viewProfile: 'View Miguel Gutierrez profile',
      closeProfile: 'Close Miguel Gutierrez profile',
    },
    productSystem: {
      status: 'systems online',
      core: 'Product core',
      coreValue: 'clear · fast · human',
      interfaces: 'interfaces',
      services: 'services',
      delivery: 'delivery',
      nativeFlows: 'native flows',
      eyebrow: 'From interaction to infrastructure',
      caption: 'One product system, engineered end to end.',
    },
    contactForm: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      messageLabel: 'Project or opportunity',
      messagePlaceholder: 'What are you building, and how can I help?',
      companyLabel: 'Company',
      submit: 'Start a conversation',
      submitting: 'Sending…',
      idle: 'Usually replies within two business days.',
      success: 'Message received. I will get back to you as soon as possible.',
      invalid: 'Review the highlighted fields and try again.',
      rateLimited: 'Please wait a few minutes before sending another message.',
      unavailable: 'I could not send the message. Please try again or contact me by email.',
      cancelled: 'The request was cancelled.',
      errors: {
        nameTooShort: 'Please enter at least two characters.',
        nameTooLong: 'Please keep your name under 80 characters.',
        emailInvalid: 'Please enter a valid email address.',
        emailTooLong: 'Please enter a shorter email address.',
        messageTooShort: 'Tell me a little more — at least 20 characters.',
        messageTooLong: 'Please keep your message under 4000 characters.',
      },
    },
    projectExplorer: {
      filterLabel: 'Filter projects',
      filters: { All: 'All', Frontend: 'Frontend', Backend: 'Backend', Mobile: 'Mobile' },
      searchLabel: 'Search projects',
      searchPlaceholder: 'Search technology or product',
      showing: 'Showing',
      of: 'of',
      projects: 'projects',
      selectedWork: 'Selected work',
      viewRepository: 'View repository',
      privateProduct: 'Private product',
      showAll: 'Show all',
      noMatchTitle: 'No matching project',
      noMatchDescription: 'Try a different category or technology.',
      viewImagePrefix: 'View',
      viewImageSuffix: 'image in detail',
      viewLarger: 'View larger',
      closeImagePrefix: 'Close',
      technologies: 'technologies',
    },
    legal: {
      back: 'Back to portfolio',
      eyebrow: 'Legal',
      lastUpdated: 'Last updated',
    },
    metadata: {
      homeTitle: 'Miguel Gutierrez — Product Engineer, Fullstack & Mobile',
      homeDescription:
        'Product engineer with 7 years building modern web platforms, backend services and cross-platform mobile apps. Explore selected products, experience and capabilities.',
      portfolioAlternateName: 'Miguel Gutierrez Portfolio',
      ogImageAlt: 'Migudev — Miguel Gutierrez, Product Engineer, Fullstack & Mobile',
      professionalInquiries: 'professional inquiries',
      present: 'present',
    },
  },
  es: {
    localeName: 'Español',
    languageSelector: 'Idioma',
    skipToContent: 'Ir al contenido',
    primaryNavigation: 'Navegación principal',
    mobileNavigation: 'Navegación móvil',
    openNavigation: 'Abrir navegación',
    heroSocialProfiles: 'Perfiles sociales principales',
    footerSocialProfiles: 'Perfiles sociales del pie de página',
    findMeOnline: 'Encuéntrame en línea',
    brandHome: 'inicio',
    whatsapp: 'WhatsApp',
    opensNewTab: 'abre en una pestaña nueva',
    legalNavigation: 'Legal',
    capabilities: 'capacidades',
    technologies: 'tecnologías',
    profileDock: {
      region: 'Contacto rápido con Miguel',
      connect: 'Conversemos',
      viewProfile: 'Ver el perfil de Miguel Gutierrez',
      closeProfile: 'Cerrar el perfil de Miguel Gutierrez',
    },
    productSystem: {
      status: 'sistemas en línea',
      core: 'Núcleo de producto',
      coreValue: 'claro · rápido · humano',
      interfaces: 'interfaces',
      services: 'servicios',
      delivery: 'entrega',
      nativeFlows: 'flujos nativos',
      eyebrow: 'De la interacción a la infraestructura',
      caption: 'Un solo sistema de producto, diseñado de extremo a extremo.',
    },
    contactForm: {
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@empresa.com',
      messageLabel: 'Proyecto u oportunidad',
      messagePlaceholder: '¿Qué estás construyendo y cómo puedo ayudarte?',
      companyLabel: 'Empresa',
      submit: 'Iniciar una conversación',
      submitting: 'Enviando…',
      idle: 'Normalmente respondo en un plazo de dos días hábiles.',
      success: 'Mensaje recibido. Te responderé lo antes posible.',
      invalid: 'Revisa los campos resaltados e inténtalo de nuevo.',
      rateLimited: 'Espera unos minutos antes de enviar otro mensaje.',
      unavailable: 'No pude enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.',
      cancelled: 'La solicitud fue cancelada.',
      errors: {
        nameTooShort: 'Escribe al menos dos caracteres.',
        nameTooLong: 'El nombre debe tener menos de 80 caracteres.',
        emailInvalid: 'Escribe una dirección de correo válida.',
        emailTooLong: 'Escribe una dirección de correo más corta.',
        messageTooShort: 'Cuéntame un poco más: al menos 20 caracteres.',
        messageTooLong: 'El mensaje debe tener menos de 4000 caracteres.',
      },
    },
    projectExplorer: {
      filterLabel: 'Filtrar proyectos',
      filters: { All: 'Todos', Frontend: 'Frontend', Backend: 'Backend', Mobile: 'Móvil' },
      searchLabel: 'Buscar proyectos',
      searchPlaceholder: 'Buscar tecnología o producto',
      showing: 'Mostrando',
      of: 'de',
      projects: 'proyectos',
      selectedWork: 'Trabajo destacado',
      viewRepository: 'Ver repositorio',
      privateProduct: 'Producto privado',
      showAll: 'Ver los',
      noMatchTitle: 'No hay proyectos coincidentes',
      noMatchDescription: 'Prueba otra categoría o tecnología.',
      viewImagePrefix: 'Ver imagen de',
      viewImageSuffix: 'en detalle',
      viewLarger: 'Ampliar imagen',
      closeImagePrefix: 'Cerrar imagen de',
      technologies: 'tecnologías',
    },
    legal: {
      back: 'Volver al portafolio',
      eyebrow: 'Legal',
      lastUpdated: 'Última actualización',
    },
    metadata: {
      homeTitle: 'Miguel Gutierrez — Ingeniero de producto, Fullstack y Mobile',
      homeDescription:
        'Ingeniero de producto con 7 años construyendo plataformas web modernas, servicios backend y aplicaciones móviles multiplataforma. Conoce productos, experiencia y capacidades.',
      portfolioAlternateName: 'Portafolio de Miguel Gutierrez',
      ogImageAlt: 'Migudev — Miguel Gutierrez, ingeniero de producto, Fullstack y Mobile',
      professionalInquiries: 'consultas profesionales',
      present: 'actualidad',
    },
  },
};

export const getUiCopy = (locale: Locale): PortfolioUiCopy => copies[locale];
