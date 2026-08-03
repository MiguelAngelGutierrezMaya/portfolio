import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

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
  },
];

describe('ProjectExplorer', () => {
  it('filters projects by category', async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    await user.click(screen.getByRole('button', { name: 'Mobile' }));

    expect(screen.getByRole('heading', { name: 'Mobile Product' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Web Product' })).not.toBeInTheDocument()
    );
    expect(screen.getByText('Showing 1 of 2 projects')).toBeInTheDocument();
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
});
