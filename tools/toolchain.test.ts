import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(readFileSync(resolve('package.json'), 'utf8')) as {
  packageManager: string;
};
const amplifyBuild = readFileSync(resolve('amplify.yml'), 'utf8');

describe('deployment toolchain', () => {
  it('uses the same exact stable pnpm release locally, in CI and in Amplify', () => {
    expect(manifest.packageManager).toMatch(/^pnpm@\d+\.\d+\.\d+$/);
    const amplifyPackageManager = amplifyBuild.match(/corepack prepare (pnpm@\S+) --activate/);
    expect(amplifyPackageManager?.[1]).toBe(manifest.packageManager);

    const workflow = readFileSync(resolve('.github/workflows/quality.yml'), 'utf8');
    expect(workflow).toContain('uses: pnpm/action-setup@');
    // action-setup reads packageManager when no separate version override is supplied.
    const setupStep = workflow.split('- name: Install pnpm')[1]?.split('- name:')[0];
    expect(setupStep).toBeDefined();
    expect(setupStep).not.toMatch(/\bversion:/);
  });

  it('keeps deployment installs locked to the reviewed dependency graph', () => {
    expect(amplifyBuild).toContain('pnpm install --frozen-lockfile');
    expect(amplifyBuild).not.toContain('--no-frozen-lockfile');
  });
});
