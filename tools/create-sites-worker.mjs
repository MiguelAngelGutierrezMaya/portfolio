import { mkdir, writeFile } from 'node:fs/promises';
import { URL } from 'node:url';

const workerDirectory = new URL('../dist/server/', import.meta.url);
const workerEntry = new URL('index.js', workerDirectory);

await mkdir(workerDirectory, { recursive: true });
await writeFile(
  workerEntry,
  `export default {
  async fetch(request, environment) {
    return environment.ASSETS.fetch(request);
  },
};
`
);
