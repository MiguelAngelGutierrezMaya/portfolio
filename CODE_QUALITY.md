# Engineering standards

## Architecture

Business-facing modules follow a small hexagonal boundary:

1. `domain` defines stable models.
2. `application` owns ports and use cases.
3. `infrastructure` supplies adapters, static repositories and UI.
4. Astro routes compose dependencies at the application edge.

UI code follows Atomic Design inside `infrastructure/ui`: atoms, molecules, organisms and templates. Components move upward only when their responsibility grows; domain code never imports UI code.

## Rendering

- Critical portfolio content must remain visible in the SSR HTML response.
- Prerender routes that do not require current S3 data, including privacy and terms.
- Use `server:defer` only for non-critical, independently dynamic content with a stable fallback.
- Keep Server Island props small so Astro can use cacheable GET requests.
- Use Astro by default and React only for stateful interaction.
- Hydrate non-critical React islands with `client:visible`.
- Respect `prefers-reduced-motion` and preserve keyboard navigation.
- Keep externally hosted media optional; primary content must not depend on it.

## Validation

- `pnpm typecheck` validates application TypeScript and TSX with TypeScript 7.
- `pnpm check:astro` validates Astro components through the isolated compiler-API compatibility
  workspace.
- `pnpm build:lambda` can bundle both TypeScript Lambdas independently of the web application.
- `pnpm validate:infra` runs SAM validation, informational `cfn-lint` checks, Guard unit tests and
  Guard validation against both deployable templates.
- `pnpm build:infra` packages both deployable AWS SAM stacks and is part of the core quality gate.
- `pnpm build` runs both type-checking layers before hybrid Amplify generation.
- `pnpm lint` covers TypeScript, React and Astro.
- `pnpm lint:workflows` validates GitHub Actions syntax and shell expressions with `actionlint`.
- `pnpm format:check` checks all supported source files.
- `pnpm test` validates domain policies, use cases, adapters and React behavior.
- `pnpm test:coverage` enforces 80% line/function/statement coverage and 70% branch coverage across
  business and adapter code.
- `pnpm test:e2e` exercises desktop and mobile user flows in Chromium.
- `pnpm test:a11y` runs Axe against every public HTML route and includes keyboard-flow coverage.
- `pnpm test:performance` enforces Lighthouse budgets: performance ≥ 96, accessibility and SEO 100,
  LCP ≤ 2.5s, CLS ≤ 0.1 and total blocking time ≤ 200ms.
- `pnpm audit` checks the complete dependency graph, including development tooling.
- `pnpm audit:prod` is available when only the production dependency graph is relevant.
- `pnpm check:all` executes the local gate, browser suite and Lighthouse budgets.
- `.github/workflows/quality.yml` executes the complete gate for pushes and pull requests.

## TypeScript compatibility boundary

The application compiler is TypeScript 7. Astro Check and the TypeScript ESLint parser currently
require the programmatic compiler API that TypeScript 7 no longer ships. Their exact TypeScript 6
runtime is isolated in `tools/quality-compat`; application dependencies never resolve it. This
boundary preserves Astro and lint diagnostics while keeping source compilation on TypeScript 7.

## Content

Portfolio data is published through a private S3 manifest. `S3PortfolioRepository` verifies the
release digest and validates the document with the versioned Zod schema. A cached
`ContentFilePortfolioRepository` snapshot is the resilience fallback. Both implement the same
application port, and UI components never import either data source directly.

Project preview URLs are signed only when their stable `/media/projects/*` path is present in the
validated portfolio document. Brand and profile images remain build-optimized assets.

## Observability

The browser adapter measures CLS, INP and LCP with the official `web-vitals` package. Metrics remain
available locally for diagnostics and are sent only when `PUBLIC_WEB_VITALS_ENDPOINT` is configured
and the visitor has not enabled Do Not Track.
