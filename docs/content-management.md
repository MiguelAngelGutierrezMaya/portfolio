# Managed portfolio content

Production content is built from a private S3 bucket. Amplify assumes a short-lived, app-scoped IAM
role during each build, creates five-minute presigned downloads, verifies every managed file with
SHA-256 and then lets Astro generate static HTML and optimized assets. Visitors receive only the
resulting Amplify CDN files; AWS credentials and S3 URLs never reach the browser.

## Resources

- CloudFormation stack: `migudev-portfolio-content`
- Region: `us-east-2`
- Bucket: `migudev-portfolio-content-108703089452-us-east-2`
- Manifest: `content/manifest.json`
- Editorial document: `content/portfolio.json`
- Brand media: `media/brand/`
- Profile media: `media/profile/`
- Optional project previews: `media/projects/`

The stack in `infra/content-store.yaml` is the source of truth. It enables S3 Block Public Access,
Bucket Owner Enforced ownership, versioning, KMS encryption with annual key rotation, S3 Bucket Key,
TLS-only access and no CORS policy. The IAM trust is restricted to the production account and this
specific Amplify app.

## Editorial contract

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
`width` and `height`. Explicit dimensions prevent layout shifts. Filenames, prefixes, extensions and
file sizes are allowlisted by `tools/sync-managed-content.mjs`.

## Publishing an update

1. Edit and validate the local content or media.
2. Run `pnpm check` before publishing.
3. Compute SHA-256 for every changed file and update `src/content/manifest.json`.
4. Upload changed objects first and the manifest last, preserving its role as the atomic release
   pointer.
5. Commit the matching source and manifest so production content remains auditable.
6. Push `main`; Amplify automatically downloads the exact private content and deploys it.

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

After recovery, update the manifest digest and trigger a new Amplify build.
