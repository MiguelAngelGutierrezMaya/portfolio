# Stable dependency refresh — 2026-10-26

This update is based on the fixes in PR #23 (which includes PR #20). Merge those
PRs first; this PR contains only the subsequent dependency refresh.

## Updated tooling and application dependencies

| Package                          | Previous declared version | New declared version |
| -------------------------------- | ------------------------- | -------------------- |
| pnpm                             | 11.1.1                    | 12.15.0              |
| @astrojs/react                   | 6.0.5                     | 7.1.1                |
| AWS SDK clients and S3 presigner | 3.1130.0                  | 3.1156.0             |
| framer-motion                    | 13.2.0                    | 14.6.0               |
| React / React DOM                | 19.3.0                    | 19.3.1               |
| web-vitals                       | 6.2.1                     | 6.2.3                |

The remaining direct packages already match npm's stable `latest` release, except
the isolated TypeScript compatibility compiler described below. Transitive packages
are resolved within upstream compatibility ranges and the repository's security
overrides; their major versions are not blindly forced beyond those ranges.

`@astrojs/react` 7 replaces Babel transforms with Oxc. The project uses `react()`
without custom Babel configuration, so no application migration is required. The
experimental React Compiler remains disabled. Motion 14 does not require changes
to the public React APIs used here; existing lazy feature loading is preserved.

## Deliberate compatibility and security constraints

- Application TypeScript remains at the latest stable 7.0.2. `tools/quality-compat`
  retains 6.0.3, the newest stable TypeScript 6 release: `@astrojs/check` 0.9.12
  accepts TypeScript 5/6, and typescript-eslint 8.72.0 requires TypeScript <6.1.
  Upgrading this workspace to 7 breaks its compiler API consumers.
- Lighthouse's current OpenTelemetry SDK requires `@opentelemetry/api` <1.10.
  Use 1.9.1 rather than allowing automatic peer installation to select 1.10.0.
- pnpm's 24-hour minimum release age remains enabled explicitly. The initial
  inherited lockfile included same-day Smithy releases; it was regenerated under
  this policy. No minimum-age exclusions or ignored security advisories were added.
- pnpm 12 writes separate YAML documents for its package-manager and application
  dependency graphs. Use the pinned pnpm version to read or regenerate the lockfile.
- Node.js and Lambda runtime remain on the existing supported 24.x line. This is
  a package upgrade, not an infrastructure deployment or runtime-major migration.

## Verification

Run `pnpm install --frozen-lockfile`, `pnpm check:all`, and `pnpm audit:prod`.
`pnpm outdated -r` should only report the documented TypeScript 6 compatibility
exception as of the review date. The suite exercises both languages, desktop/mobile
interactions, SSR contact boundaries, project previews, accessibility, and the six
Lighthouse routes. New toolchain tests prevent Amplify's pnpm pin from diverging
from the version used locally and by GitHub Actions.

References: [Astro React upgrade guide](https://docs.astro.build/en/guides/integrations-guide/react/),
[Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide),
[pnpm settings](https://pnpm.io/settings).
