# Code Quality Documentation

This document outlines the code quality standards and tools implemented in this project.

## Tools and Configuration

### ESLint

ESLint is configured to enforce code quality standards across the project. The configuration includes:

- TypeScript support via `@typescript-eslint`
- React-specific rules via `eslint-plugin-react` and `eslint-plugin-react-hooks`
- Accessibility rules via `eslint-plugin-jsx-a11y`
- Astro-specific rules via `eslint-plugin-astro`
- Integration with Prettier via `eslint-config-prettier` and `eslint-plugin-prettier`

### Prettier

Prettier is configured to enforce consistent code formatting across the project. The configuration includes:

- Single quotes
- 2-space indentation
- 100 character line length
- Trailing commas in ES5 syntax
- Specific configuration for Astro files via `prettier-plugin-astro`

## Path Aliases

Path aliases have been configured to eliminate relative path imports and improve code maintainability:

- `@/*` - Points to the `src` directory
- `@modules/*` - Points to the `src/modules` directory
- `@layouts/*` - Points to the `src/layouts` directory
- `@pages/*` - Points to the `src/pages` directory
- `@shared/*` - Points to the `src/modules/shared` directory
- `@principal/*` - Points to the `src/modules/principal` directory

Path aliases are configured in both `tsconfig.json` and `astro.config.mjs` to ensure consistent behavior.

## Hexagonal Architecture

The project follows a hexagonal architecture pattern, also known as ports and adapters:

### Structure

```
src/
└── modules/
    ├── principal/
    │   ├── models/              # Domain models and interfaces
    │   ├── application/         # Use cases and business logic
    │   └── infrastructure/      # Implementation details
    │       ├── controllers/     # API controllers
    │       ├── repositories/    # Data access
    │       └── ui/              # UI components
    └── shared/
        ├── models/              # Shared domain models
        ├── application/         # Shared use cases
        └── infrastructure/      # Shared implementation details
```

### Principles

1. **Domain-Driven Design**: Core business logic is isolated in the domain and application layers.
2. **Dependency Inversion**: High-level modules don't depend on low-level modules.
3. **Separation of Concerns**: Each component has a single responsibility.
4. **Testability**: Business logic is easy to test in isolation.

## Commands

### Linting

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues automatically
pnpm lint:fix
```

### Formatting

```bash
# Format code with Prettier
pnpm format

# Check if code is properly formatted
pnpm check
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Documentation Standards

All functions, classes, and interfaces in the codebase are documented using JSDoc comments, which include:

- A brief description of the purpose
- Parameter descriptions with types
- Return value descriptions
- Author information where applicable

This documentation provides better IDE support and makes the codebase more maintainable. 