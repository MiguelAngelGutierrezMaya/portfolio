import { execFile } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(import.meta.dirname, '..');
const bucket = process.env.CONTENT_BUCKET;
const region = process.env.CONTENT_REGION;
const signerFunction = process.env.CONTENT_SIGNER_FUNCTION;
const manifestKey = process.env.CONTENT_MANIFEST_KEY ?? 'content/manifest.json';
const syncRequired = process.env.CONTENT_SYNC_REQUIRED === 'true';
const urlLifetimeSeconds = 300;
let awsCliMajorPromise;

const managedFiles = {
  portfolio: {
    kind: 'json',
    maxBytes: 512 * 1024,
    prefix: 'content/',
    destination: 'src/content/portfolio.json',
  },
  brandLogo: {
    kind: 'image',
    maxBytes: 4 * 1024 * 1024,
    prefix: 'media/brand/',
    destination: 'src/assets/migudev-logo.webp',
  },
  profilePortrait: {
    kind: 'image',
    maxBytes: 12 * 1024 * 1024,
    prefix: 'media/profile/',
    destination: 'src/assets/miguel-gutierrez-portrait.png',
  },
};

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
}

function assertManagedKey(key, prefix, label) {
  if (typeof key !== 'string' || !key.startsWith(prefix) || key.includes('..')) {
    throw new Error(`${label} must stay inside ${prefix}`);
  }
}

async function createPresignedUrl(key) {
  const responseFile = path.join(tmpdir(), `migudev-presign-${randomUUID()}.json`);

  try {
    awsCliMajorPromise ??= execFileAsync('aws', ['--version']).then(({ stdout, stderr }) => {
      const match = `${stdout} ${stderr}`.match(/aws-cli\/(\d+)\./);
      if (!match) throw new Error('Unable to determine the AWS CLI major version');
      return Number(match[1]);
    });
    const awsCliMajor = await awsCliMajorPromise;
    const rawPayload = JSON.stringify({ key });
    const payloadArguments =
      awsCliMajor >= 2
        ? ['--payload', rawPayload, '--cli-binary-format', 'raw-in-base64-out']
        : ['--payload', rawPayload];
    const { stdout } = await execFileAsync('aws', [
      'lambda',
      'invoke',
      '--function-name',
      signerFunction,
      ...payloadArguments,
      '--region',
      region,
      responseFile,
    ]);
    const invocation = JSON.parse(stdout);
    if (invocation.FunctionError) throw new Error(`Content signer failed for ${key}`);

    const payload = JSON.parse(await readFile(responseFile, 'utf8'));
    if (payload.expiresIn !== urlLifetimeSeconds || typeof payload.url !== 'string') {
      throw new Error(`Content signer returned an invalid response for ${key}`);
    }

    const signedUrl = new URL(payload.url);
    const allowedHosts = new Set([
      `${bucket}.s3.${region}.amazonaws.com`,
      `${bucket}.s3.amazonaws.com`,
    ]);
    if (signedUrl.protocol !== 'https:' || !allowedHosts.has(signedUrl.hostname)) {
      throw new Error(`Content signer returned an unexpected host for ${key}`);
    }

    return signedUrl.toString();
  } finally {
    await rm(responseFile, { force: true });
  }
}

function assertDescriptor(descriptor, label) {
  assertObject(descriptor, label);
  if (typeof descriptor.sha256 !== 'string' || !/^[a-f0-9]{64}$/i.test(descriptor.sha256)) {
    throw new Error(`${label}.sha256 must be a SHA-256 digest`);
  }
}

async function download(descriptor, options) {
  assertDescriptor(descriptor, options.destination);
  const { key, sha256 } = descriptor;
  assertManagedKey(key, options.prefix, options.destination);
  const response = await fetch(await createPresignedUrl(key), {
    headers: { 'User-Agent': 'migudev-amplify-content-sync/1.0' },
  });

  if (!response.ok) {
    throw new Error(`Unable to download ${key}: ${response.status} ${response.statusText}`);
  }

  const declaredLength = Number(response.headers.get('content-length') ?? 0);
  if (declaredLength > options.maxBytes) {
    throw new Error(`${key} exceeds the ${options.maxBytes}-byte limit`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > options.maxBytes) {
    throw new Error(`${key} exceeds the ${options.maxBytes}-byte limit`);
  }

  const digest = createHash('sha256').update(bytes).digest('hex');
  if (digest !== sha256.toLowerCase()) {
    throw new Error(`Integrity check failed for ${key}`);
  }

  if (options.kind === 'json') {
    JSON.parse(new TextDecoder().decode(bytes));
  }

  const destination = path.resolve(projectRoot, options.destination);
  const temporaryFile = `${destination}.managed-content-tmp`;
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(temporaryFile, bytes, { mode: 0o600 });
  await rename(temporaryFile, destination);
  await rm(temporaryFile, { force: true });
  process.stdout.write(`Synced ${key} -> ${options.destination}\n`);
}

function projectPreviewOptions(filename) {
  if (
    typeof filename !== 'string' ||
    !/^[a-z0-9][a-z0-9._-]*\.(avif|webp|png|jpe?g)$/i.test(filename)
  ) {
    throw new Error(`Invalid project preview filename: ${filename}`);
  }

  return {
    kind: 'image',
    maxBytes: 4 * 1024 * 1024,
    prefix: 'media/projects/',
    destination: `public/media/projects/${filename}`,
  };
}

if (!bucket) {
  if (syncRequired) {
    throw new Error('CONTENT_BUCKET is required when CONTENT_SYNC_REQUIRED=true');
  }
  process.stdout.write('Managed content sync skipped: CONTENT_BUCKET is not configured.\n');
  process.exit(0);
}

if (!region) {
  throw new Error('CONTENT_REGION is required when CONTENT_BUCKET is configured');
}

if (!signerFunction) {
  throw new Error('CONTENT_SIGNER_FUNCTION is required when CONTENT_BUCKET is configured');
}

assertManagedKey(manifestKey, 'content/', 'CONTENT_MANIFEST_KEY');
const manifestResponse = await fetch(await createPresignedUrl(manifestKey));
if (!manifestResponse.ok) {
  throw new Error(`Unable to download ${manifestKey}: ${manifestResponse.status}`);
}

const manifest = await manifestResponse.json();
assertObject(manifest, 'manifest');
assertObject(manifest.content, 'manifest.content');
assertObject(manifest.assets, 'manifest.assets');
if (manifest.schemaVersion !== 1) throw new Error('Unsupported managed content manifest version');
if (!Array.isArray(manifest.projectPreviews)) {
  throw new Error('manifest.projectPreviews must be an array');
}

await download(manifest.content.portfolio, managedFiles.portfolio);
await Promise.all([
  download(manifest.assets.brandLogo, managedFiles.brandLogo),
  download(manifest.assets.profilePortrait, managedFiles.profilePortrait),
  ...manifest.projectPreviews.map(preview => {
    assertObject(preview, 'project preview');
    return download(preview, projectPreviewOptions(preview.filename));
  }),
]);
