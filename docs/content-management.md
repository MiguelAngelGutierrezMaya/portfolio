# Managed portfolio content

Production content is read on demand from a private S3 bucket by Astro SSR. Amplify Compute assumes
a runtime-only IAM role with read access to the manifest, portfolio JSON and published company and
project media. The repository verifies the manifest SHA-256 and validates the JSON with Zod before
rendering. Responses are cached briefly and fall back to the bundled release snapshot if S3 or KMS
is temporarily unavailable.

The build has a separate IAM role. It invokes a tested TypeScript Lambda that creates five-minute
presigned downloads for the JSON, logo and portrait, keeping the bundled snapshot and optimized
brand assets deterministic. Company logos and project previews use stable application URLs and are
presigned on demand only after the requested filename is found in validated portfolio content.

## Resources

- CloudFormation stack: `migudev-portfolio-content`
- Region: `us-east-2`
- Bucket: `migudev-portfolio-content-108703089452-us-east-2`
- Amplify build region variable: `CONTENT_REGION=us-east-2`
- Private signer: `migudev-portfolio-content-presigner`
- SSR Compute role: `MigudevPortfolioAmplifyComputeRole`
- Manifest: `content/manifest.json`
- Editorial document: `content/portfolio.json`
- Brand media: `media/brand/`
- Profile media: `media/profile/`
- Company logos: `media/companies/`
- Optional project previews: `media/projects/`

The stack in `infra/content-store.yaml` and the TypeScript handler in
`infra/functions/content-presigner/handler.ts` are the source of truth. They enable S3 Block Public
Access, Bucket Owner Enforced ownership, versioning, KMS encryption with annual key rotation, S3
Bucket Key, TLS-only access and no CORS policy. Build and SSR Compute use separate roles. The build
role trust is restricted to the production account and this specific Amplify app; the Compute role
uses the trust contract required by Amplify SSR and compensates with an identity policy limited to
the published content and runtime media prefixes. The build role can invoke the signer and apply
declared routing rules.

## Managed content contract

`src/content/portfolio.json` is validated at the infrastructure boundary with Zod. It owns profile,
navigation, calls to action, metrics, social profiles, section copy, capabilities, projects,
experience, technology groups, contact copy and footer links.

`src/content/manifest.json` maps the private S3 objects to build destinations. Each entry includes a
SHA-256 digest. Project preview entries use this shape:

```json
{
  "key": "media/projects/example.webp",
  "filename": "example.webp",
  "sha256": "<64-character SHA-256>"
}
```

The portfolio project can then reference the image with a `preview` object containing `src`, `alt`,
`width` and `height`. Experience logos follow the same contract under `media/companies/`. Explicit
dimensions prevent layout shifts. Filenames, prefixes, extensions and file sizes are allowlisted by
`tools/sync-managed-content.mjs`. Runtime signing additionally requires every media path to be
referenced by the validated portfolio document.

## Publishing an update

1. Edit and validate the local content or media.
2. Run `pnpm check` before publishing.
3. Compute SHA-256 for every changed file and update `src/content/manifest.json`.
4. Upload changed objects first and the manifest last, preserving its role as the atomic release
   pointer.
5. The SSR homepage and LLM endpoints observe the release after their short cache expires; no rebuild
   is required for JSON, company logo or project preview changes.
6. Commit the matching source and manifest so the fallback snapshot remains auditable.
7. Push `main` when logo, portrait, application code or the bundled fallback must change.

Example upload commands:

```bash
aws s3 cp src/content/portfolio.json \
  s3://migudev-portfolio-content-108703089452-us-east-2/content/portfolio.json \
  --content-type application/json --cache-control no-store \
  --profile miguel.gutierrez-prod --region us-east-2

aws s3 cp src/content/manifest.json \
  s3://migudev-portfolio-content-108703089452-us-east-2/content/manifest.json \
  --content-type application/json --cache-control no-store \
  --profile miguel.gutierrez-prod --region us-east-2
```

Default bucket encryption applies KMS automatically. Do not add access keys to GitHub, Amplify
environment variables or source control.

## Infrastructure deployment

The presigner is no longer embedded in CloudFormation. AWS SAM compiles and packages the TypeScript
handler referenced by `CodeUri`:

```bash
pnpm validate:infra
pnpm build:infra
sam deploy \
  --template-file .aws-sam/build/template.yaml \
  --stack-name migudev-portfolio-content \
  --resolve-s3 \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --profile miguel.gutierrez-prod \
  --region us-east-2
```

After the stack exposes `AmplifyContentComputeRoleArn`, associate it with the existing Amplify app
and use platform `WEB_COMPUTE`. The app environment must contain `ASTRO_KEY`, `CONTENT_BUCKET`,
`CONTENT_MANIFEST_KEY`, `CONTENT_REGION` and `AMPLIFY_TARGET_APP_ID`. AWS credentials are supplied by
the Compute role, never by environment variables.

## Recovery and lifecycle

Current objects never expire automatically. JSON keeps at least the ten newest noncurrent versions
and expires older noncurrent versions after 365 days. Previous media versions move to Standard-IA
after 30 days, Glacier Flexible Retrieval after 90 days, Deep Archive after 180 days and expire after
730 days while retaining at least the three newest noncurrent versions. Incomplete multipart uploads
are removed after seven days.

To inspect and restore an old version, list versions and copy the selected version back onto the same
key. The copy creates a new current version instead of destroying history:

```bash
aws s3api list-object-versions \
  --bucket migudev-portfolio-content-108703089452-us-east-2 \
  --prefix content/portfolio.json \
  --profile miguel.gutierrez-prod --region us-east-2

aws s3api copy-object \
  --bucket migudev-portfolio-content-108703089452-us-east-2 \
  --key content/portfolio.json \
  --copy-source 'migudev-portfolio-content-108703089452-us-east-2/content/portfolio.json?versionId=<VERSION_ID>' \
  --profile miguel.gutierrez-prod --region us-east-2
```

After recovery, update the manifest digest. SSR observes the restored release after cache expiry;
trigger a build only when the bundled fallback should also be refreshed.
