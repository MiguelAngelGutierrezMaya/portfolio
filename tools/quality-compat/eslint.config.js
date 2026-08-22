import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.amplify-hosting/**',
      '.artifacts/**',
      '.aws-sam/**',
      'coverage/**',
      'node_modules/**',
      'public/**',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs['flat/recommended'],
  {
    files: ['**/*.{cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.{cjs,js,jsx,mjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    extends: [
      eslintReact.configs['recommended-typescript'],
      reactHooks.configs.flat['recommended-latest'],
      jsxA11y.flatConfigs.recommended,
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  eslintConfigPrettier
);
