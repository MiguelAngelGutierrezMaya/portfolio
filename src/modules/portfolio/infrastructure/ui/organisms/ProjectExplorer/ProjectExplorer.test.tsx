import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Project } from '@portfolio/domain/models/Portfolio';

import ProjectExplorer from './ProjectExplorer';

const projects: readonly Project[] = [
  {
    id: 'web-product',
    title: 'Web Product',
    summary: 'A polished customer-facing experience built for the modern web.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript'],
  },
  {
    id: 'mobile-product',
    title: 'Mobile Product',
    summary: 'A native mobile experience focused on reliable customer workflows.',
    category: 'Mobile',
    technologies: ['Swift', 'SwiftUI'],
    preview: {
      src: '/media/projects/mobile-product.webp',
      alt: 'Mobile Product app interface',
      width: 960,
      height: 600,
    },
  },
  {
    id: 'backend-service',
    title: 'Backend Service',
    summary: 'A secure service for distributed product workflows.',
    category: 'Backend',
    technologies: ['Node.js', 'AWS Lambda'],
    preview: {
      src: '/media/projects/backend.webp',
      alt: 'Generic backend architecture preview',
      width: 805,
      height: 428,
      presentation: 'generic',
    },
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(document, 'startViewTransition');
  delete document.documentElement.dataset.projectPreviewOpen;
  delete document.documentElement.dataset.projectPreviewTransition;
});

describe('ProjectExplorer', () => {
  it('filters projects by category', async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    await user.click(screen.getByRole('button', { name: /^Mobile$/ }));

    expect(screen.getByRole('heading', { name: 'Mobile Product' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Web Product' })).not.toBeInTheDocument()
    );
    expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
  });

  it('searches across title, summary and technologies', async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    await user.type(screen.getByRole('searchbox'), 'TypeScript');

    expect(screen.getByRole('heading', { name: 'Web Product' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Mobile Product' })).not.toBeInTheDocument()
    );
  });

  it('opens an accessible project preview and restores focus after closing', async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    const trigger = screen.getByRole('button', {
      name: 'View Mobile Product image in detail',
    });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Mobile Product' });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByRole('img', { name: 'Mobile Product app interface' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-project-preview-open', 'true');

    await user.click(screen.getByRole('button', { name: 'Close Mobile Product image' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(document.documentElement).not.toHaveAttribute('data-project-preview-open');
  });

  it('uses a same-document view transition when the browser supports it', async () => {
    const user = userEvent.setup();
    const startViewTransition = vi.fn((update: () => void) => {
      update();
      return { finished: Promise.resolve() };
    });
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: startViewTransition,
    });
    render(<ProjectExplorer projects={projects} />);

    await user.click(screen.getByRole('button', { name: 'View Mobile Product image in detail' }));

    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(screen.getByRole('dialog', { name: 'Mobile Product' })).toBeInTheDocument();
    await waitFor(() =>
      expect(document.documentElement).not.toHaveAttribute('data-project-preview-transition')
    );
  });

  it('does not make generic backend artwork interactive', () => {
    render(<ProjectExplorer projects={projects} />);

    expect(
      screen.queryByRole('button', { name: 'View Backend Service image in detail' })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Generic backend architecture preview' })).toBeVisible();
  });
});
