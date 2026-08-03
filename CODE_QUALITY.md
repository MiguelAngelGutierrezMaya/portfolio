# Engineering standards

## Architecture

Business-facing modules follow a small hexagonal boundary:

1. `domain` defines stable models.
2. `application` owns ports and use cases.
3. `infrastructure` supplies adapters, static repositories and UI.
4. Astro routes compose dependencies at the application edge.

UI code follows Atomic Design inside `infrastructure/ui`: atoms, molecules, organisms and templates. Components move upward only when their responsibility grows; domain code never imports UI code.

## Rendering

- Content must remain visible in generated HTML.
- Use Astro by default and React only for stateful interaction.
- Hydrate non-critical React islands with `client:visible`.
- Respect `prefers-reduced-motion` and preserve keyboard navigation.
- Keep externally hosted media optional; primary content must not depend on it.

## Validation

- `pnpm build` performs Astro and TypeScript checks before generation.
- `pnpm lint` covers TypeScript, React and Astro.
- `pnpm format:check` checks all supported source files.
- `pnpm test` validates domain policies, use cases, adapters and React behavior.
- `pnpm test:coverage` enforces 80% line/function/statement coverage and 70% branch coverage across
  business and adapter code.
- `pnpm test:e2e` exercises desktop and mobile user flows in Chromium.
- `pnpm test:a11y` runs Axe against every public HTML route and includes keyboard-flow coverage.
- `pnpm test:performance` enforces Lighthouse budgets: performance ≥ 90, accessibility and SEO 100,
  LCP ≤ 2.5s, CLS ≤ 0.1 and total blocking time ≤ 200ms.
- `pnpm audit` checks the complete dependency graph, including development tooling.
- `pnpm audit:prod` is available when only the production dependency graph is relevant.
- `.github/workflows/quality.yml` executes the complete gate for pushes and pull requests.

## Content

Portfolio data lives in `src/content/portfolio.json`. `ContentFilePortfolioRepository` validates it
with a versioned Zod schema and implements the same application port a CMS or API adapter would use.
UI components never import the content file directly.

## Observability

The browser adapter measures CLS, INP and LCP with the official `web-vitals` package. Metrics remain
available locally for diagnostics and are sent only when `PUBLIC_WEB_VITALS_ENDPOINT` is configured
and the visitor has not enabled Do Not Track.
