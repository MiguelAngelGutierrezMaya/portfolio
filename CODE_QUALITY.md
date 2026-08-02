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
- `pnpm test` validates application use cases and curated content invariants.
- `pnpm audit --prod` checks the production dependency graph.

## Content

Portfolio data lives in the static repository adapter rather than UI components. New data sources can implement the same repository port without changing the domain model or presentation template.
