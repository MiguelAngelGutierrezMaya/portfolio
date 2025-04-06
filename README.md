# Personal Portfolio

A modern, responsive portfolio website built with Astro, React, Three.js, and TailwindCSS. This portfolio showcases my projects, skills, and professional experience with interactive 3D elements and smooth animations.

## 🚀 Technologies

- **[Astro](https://astro.build/)**: Core framework providing optimal performance
- **[React](https://reactjs.org/)**: For interactive UI components
- **[Three.js](https://threejs.org/)** & **[@react-three/fiber](https://github.com/pmndrs/react-three-fiber)**: For 3D visualizations
- **[TailwindCSS](https://tailwindcss.com/)**: For styling
- **[Framer Motion](https://www.framer.com/motion/)**: For animations
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety

## 📁 Project Structure

This project follows a hexagonal architecture pattern:

```text
/
├── public/                # Static assets
├── src/
│   ├── modules/
│   │   ├── principal/     # Main portfolio features
│   │   │   ├── models/    # Domain models
│   │   │   └── infrastructure/
│   │   │       └── ui/    # UI components
│   │   └── shared/        # Shared code
│   ├── pages/             # Astro pages
│   ├── layouts/           # Layout components
│   └── env.d.ts           # TypeScript environment declarations
└── package.json
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   This will start the server at `http://localhost:4321`

## 📋 Available Commands

| Command | Description |
| :------ | :---------- |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm check` | Check formatting |
| `pnpm code:fix` | Run formatter and linter together |

## 🚢 Deployment

This site is optimized for deployment on various platforms that support static site hosting:

1. Build the project:
   ```bash
   pnpm build
   ```

2. The output in the `dist/` directory can be deployed to platforms like:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static web server

## 📝 Code Quality

This project follows strict code quality standards:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Path aliases for clean imports

For detailed information on code quality standards, see [CODE_QUALITY.md](./CODE_QUALITY.md).

## 📫 Contact

- **Name**: Miguel Angel Gutierrez
- **Email**: gutierrezmayamiguelangel@gmail.com

## 📄 License

[MIT](LICENSE)

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
