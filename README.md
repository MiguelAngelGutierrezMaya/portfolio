# Miguel Gutierrez — Portfolio

A content-first personal portfolio built with Astro and focused React islands. The project combines hexagonal architecture for business boundaries with Atomic Design for scalable interface composition.

## Stack

- Astro 7 for static rendering, routing and SEO
- React 19 for the project explorer and contact form
- Framer Motion for stateful project transitions
- TypeScript with strict and unchecked-index validation
- Plain CSS design tokens and component layers
- Vitest for application-level tests

## Architecture

```text
src/
├── layouts/                         # Shared document shell and metadata
├── modules/
│   ├── contact/
│   │   ├── domain/                  # Contact models
│   │   ├── application/             # Ports and use cases
│   │   └── infrastructure/          # HTTP adapter and UI organism
│   ├── legal/                       # Legal content port, repository and template
│   └── portfolio/
│       ├── domain/                  # Portfolio entities
│       ├── application/             # Repository port and content use case
│       └── infrastructure/
│           ├── repositories/        # Static content adapter
│           └── ui/                  # Atomic Design: atoms → templates
├── pages/                           # Astro route composition
└── styles/                          # Tokens, base, components and motion
```

Astro renders the complete content to HTML. React hydrates only the project filtering/search experience and the contact form when they approach the viewport.

## Development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and provide the relevant public contact-service values.

## Quality commands

```bash
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm audit --prod
```

## Routes

- `/` — portfolio
- `/privacy/` — privacy policy
- `/terms/` — terms of use
- `/robots.txt` and `/sitemap.xml` — crawl metadata

## License

MIT © Miguel Angel Gutierrez Maya
