import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(toolDirectory, '../..');
const command = process.argv[2];
const executableName = process.platform === 'win32' ? `${command}.cmd` : command;
const executable = path.join(toolDirectory, 'node_modules', '.bin', executableName);
const argumentsByCommand = {
  eslint: ['.'],
  'astro-check': ['--root', projectRoot, '--tsconfig', path.join(projectRoot, 'tsconfig.json')],
};
const args = argumentsByCommand[command];

if (!args) {
  throw new Error(`Unsupported quality command: ${command ?? 'missing'}`);
}

const result = spawnSync(executable, args, {
  cwd: projectRoot,
  stdio: 'inherit',
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
