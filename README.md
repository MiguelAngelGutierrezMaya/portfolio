# Miguel Gutierrez — Portfolio

A content-first personal portfolio built with Astro and focused React islands. The project combines hexagonal architecture for business boundaries with Atomic Design for scalable interface composition.

## Stack

- Astro 7 for static rendering, routing and SEO
- React 19 for the project explorer and contact form
- Framer Motion for stateful project transitions
- TypeScript 7 with strict and unchecked-index validation
- Plain CSS design tokens and component layers
- Zod-validated JSON content with a replaceable repository adapter
- Vitest and Testing Library for unit and component tests
- Playwright and Axe for browser, keyboard and accessibility tests
- Lighthouse CI and `web-vitals` for performance budgets and field telemetry

## Architecture

```text
src/
├── layouts/                         # Shared document shell and metadata
├── content/                         # Versioned editorial content
├── modules/
│   ├── contact/
│   │   ├── domain/                  # Contact models
│   │   ├── application/             # Ports and use cases
│   │   └── infrastructure/          # HTTP adapter and UI organism
│   ├── legal/                       # Legal content port, repository and template
│   ├── observability/               # Browser performance adapter
│   └── portfolio/
│       ├── domain/                  # Portfolio entities
│       ├── application/             # Repository port and content use case
│       └── infrastructure/
│           ├── content/             # Runtime content schema
│           ├── repositories/        # Validated file adapter
│           └── ui/                  # Atomic Design: atoms → templates
├── pages/                           # Astro route composition
└── styles/                          # Tokens, base, components and motion
tools/
└── quality-compat/                  # Isolated Astro/ESLint compiler compatibility
```

Astro renders the complete content to HTML. React hydrates only the project filtering/search experience and the contact form when they approach the viewport.

## Development

The project targets Node.js 24.19 LTS. With NVM installed, activate the pinned runtime first:

```bash
nvm use
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and provide the relevant public contact-service values.

Portfolio projects, experience and skill groups live in `src/content/portfolio.json`. The
repository validates this file before exposing it to the application, so a future CMS or API can
replace the file adapter without changing the UI.

## Quality commands

```bash
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm test:a11y
pnpm test:performance
pnpm check
pnpm check:all
pnpm audit
pnpm audit:prod
```

`pnpm check` is the local equivalent of the core CI gate. GitHub Actions additionally runs the
desktop/mobile browser suite and the Lighthouse performance budgets. Dependabot groups production
and development dependency updates on a weekly schedule.

The application is compiled directly with TypeScript 7. Astro Check and the current ESLint parser
still depend on the compiler API removed from TypeScript 7, so `tools/quality-compat` isolates their
TypeScript 6 runtime without downgrading the application compiler. Remove this compatibility
workspace once those upstream tools publish native TypeScript 7 support.

The runtime records CLS, INP and LCP in `window.__PORTFOLIO_WEB_VITALS__`. Set
`PUBLIC_WEB_VITALS_ENDPOINT` only when a telemetry collector is available; visitors with Do Not
Track enabled are never reported.

## Routes

- `/` — portfolio
- `/privacy/` — privacy policy
- `/terms/` — terms of use
- `/robots.txt` and `/sitemap.xml` — crawl metadata

## License

MIT © Miguel Angel Gutierrez Maya
