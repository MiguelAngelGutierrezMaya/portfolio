import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const projectRoot = path.resolve(import.meta.dirname, '..');

const managedMedia = [
  {
    source: 'src/assets/miguel-gutierrez-portrait.png',
    destination: 'public/media/profile',
    basename: 'miguel-gutierrez-portrait',
    widths: [320, 480, 640],
    formats: [
      { extension: 'avif', options: { quality: 62, effort: 4 } },
      { extension: 'webp', options: { quality: 84, effort: 4 } },
    ],
  },
  {
    source: 'src/assets/migudev-logo.webp',
    destination: 'public/media/brand',
    basename: 'migudev-logo',
    widths: [92, 184],
    formats: [{ extension: 'webp', options: { quality: 88, effort: 4 } }],
  },
];

async function optimizeAsset(asset) {
  const source = path.resolve(projectRoot, asset.source);
  const destination = path.resolve(projectRoot, asset.destination);
  const metadata = await sharp(source).metadata();
  const largestWidth = Math.max(...asset.widths);

  if (!metadata.width || metadata.width < largestWidth) {
    throw new Error(`${asset.source} must be at least ${largestWidth}px wide`);
  }

  await mkdir(destination, { recursive: true });
  await Promise.all(
    asset.widths.flatMap(width =>
      asset.formats.map(async format => {
        const output = path.join(destination, `${asset.basename}-${width}.${format.extension}`);
        const pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true });

        await pipeline[format.extension](format.options).toFile(output);
      })
    )
  );

  process.stdout.write(
    `Optimized ${asset.source} -> ${asset.destination} (${asset.widths.join(', ')}px)\n`
  );
}

await Promise.all(managedMedia.map(optimizeAsset));
