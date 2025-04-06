#!/usr/bin/env node

/**
 * This script helps fix common linting issues in the codebase
 * - Adds 'type' to imports that are only used as types
 * - Adds rel="noreferrer" to links with target="_blank"
 * - Converts empty components to self-closing tags
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.resolve(__dirname, '../src');
const FILE_PATTERNS = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'];

// Transformations
const transformations = [
  // Convert non-type imports to type imports when only used as types
  {
    name: 'Convert to type imports',
    pattern: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g,
    transform: (match, imports, source, _) => {
      // This is a simplified check - a more robust implementation would 
      // parse the AST to determine if imports are only used as types
      if (imports.includes('type') || source.includes('/models/') || source.includes('/types/')) {
        return `import type { ${imports} } from '${source}'`;
      }
      return match;
    }
  },
  
  // Add rel="noreferrer" to target="_blank" links
  {
    name: 'Add rel="noreferrer" to target="_blank" links',
    pattern: /target="_blank"(?!\s+rel=)/g,
    transform: () => 'target="_blank" rel="noreferrer"'
  },
  
  // Convert empty elements to self-closing tags
  {
    name: 'Convert empty elements to self-closing tags',
    pattern: /<([a-zA-Z][a-zA-Z0-9]*)([^>]*)><\/\1>/g,
    transform: (_, tagName, attributes) => `<${tagName}${attributes} />`
  }
];

// Helper functions
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  transformations.forEach(({ name, pattern, transform }) => {
    const originalContent = content;
    content = content.replace(pattern, transform);
    
    if (originalContent !== content) {
      modified = true;
      console.log(`[${name}] Modified: ${filePath}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

async function processDirectory() {
  const options = { cwd: SRC_DIR };
  
  for (const pattern of FILE_PATTERNS) {
    const files = await glob(pattern, options);
    
    console.log(`Processing ${files.length} files matching ${pattern}...`);
    
    files.forEach(file => {
      const filePath = path.join(SRC_DIR, file);
      processFile(filePath);
    });
  }
}

// Main execution
console.log('Starting automatic linting fixes...');
processDirectory().then(() => {
  console.log('Finished! Run "pnpm lint" to check for remaining issues.');
}); 