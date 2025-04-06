# Code Quality Standards

This document outlines the linting rules and code quality standards used in this project.

## ESLint Configuration

We use a modern ESLint configuration with flat config format that enforces high code quality standards across JavaScript, TypeScript, React, and Astro files.

### General Code Quality Rules

- **No console statements** (`no-console`): Warns when console statements are used, except for `console.warn` and `console.error`.
- **No debugger statements** (`no-debugger`): Warns when debugger statements are left in code.
- **No duplicate imports** (`no-duplicate-imports`): Prevents importing the same module multiple times.
- **No unused expressions** (`no-unused-expressions`): Prevents expressions that don't have any effect.
- **Prefer const** (`prefer-const`): Enforces the use of `const` for variables that aren't reassigned.
- **Spaced comments** (`spaced-comment`): Enforces consistent spacing in comments.
- **No var** (`no-var`): Prevents using `var` for variable declarations.

### React Rules

- **JSX key prop** (`react/jsx-key`): Ensures elements in arrays have a unique `key` prop.
- **Safe target blank** (`react/jsx-no-target-blank`): Prevents security vulnerabilities with `target="_blank"`.
- **Pascal case for components** (`react/jsx-pascal-case`): Enforces PascalCase for component names.
- **No array index as key** (`react/no-array-index-key`): Warns against using array indices as keys.
- **Dangerously set inner HTML warning** (`react/no-danger`): Warns when using `dangerouslySetInnerHTML`.
- **Self-closing components** (`react/self-closing-comp`): Enforces self-closing for components without children.

### React Hooks Rules

- **Rules of Hooks** (`react-hooks/rules-of-hooks`): Enforces the Rules of Hooks.
- **Exhaustive dependencies** (`react-hooks/exhaustive-deps`): Checks dependencies of Hooks like useEffect.

### Accessibility Rules

- **Alt text** (`jsx-a11y/alt-text`): Enforces alt text on `img` elements.
- **Anchor content** (`jsx-a11y/anchor-has-content`): Ensures anchors have content.
- **ARIA props** (`jsx-a11y/aria-props`): Validates ARIA props.
- **Heading content** (`jsx-a11y/heading-has-content`): Ensures headings have content.
- **Autofocus warning** (`jsx-a11y/no-autofocus`): Warns against using autofocus.
- **No redundant roles** (`jsx-a11y/no-redundant-roles`): Prevents redundant ARIA roles.

### TypeScript Rules

- **No explicit any** (`@typescript-eslint/no-explicit-any`): Warns against using the `any` type.
- **No empty interfaces** (`@typescript-eslint/no-empty-interface`): Prevents empty interfaces.
- **No non-null assertions** (`@typescript-eslint/no-non-null-assertion`): Warns against using non-null assertions.
- **Consistent type imports** (`@typescript-eslint/consistent-type-imports`): Enforces using `import type` for type imports.
- **Naming conventions** (`@typescript-eslint/naming-convention`): Enforces PascalCase naming for interfaces, types, and enums.

### Astro Rules

- **No unused define vars in style** (`astro/no-unused-define-vars-in-style`): Prevents defining variables that aren't used in styles.
- **No unused CSS selectors** (`astro/no-unused-css-selector`): Warns about unused CSS selectors.
- **Prefer split class list** (`astro/prefer-split-class-list`): Encourages splitting class lists for readability.

## Fixing Common Linting Issues

Here are some common linting issues and how to fix them:

### Self-closing components

Change:
```jsx
<div></div>
```

To:
```jsx
<div />
```

### Adding noreferrer to target="_blank"

Change:
```jsx
<a href="https://example.com" target="_blank">Link</a>
```

To:
```jsx
<a href="https://example.com" target="_blank" rel="noreferrer">Link</a>
```

### Using type imports

Change:
```typescript
import { SomeType } from './types';
```

To:
```typescript
import type { SomeType } from './types';
```

## Running Linting

To check your code for linting issues:

```bash
pnpm lint
```

To automatically fix linting issues where possible:

```bash
pnpm lint --fix
```

To format code using Prettier:

```bash
pnpm format
``` 