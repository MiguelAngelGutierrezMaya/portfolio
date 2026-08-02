import { AnimatePresence, motion } from 'framer-motion';
import { useDeferredValue, useMemo, useState } from 'react';

import type { Project, ProjectCategory } from '@portfolio/domain/models/Portfolio';

import './ProjectExplorer.css';

interface ProjectExplorerProps {
  projects: Project[];
}

type ProjectFilter = 'All' | ProjectCategory;

const filters: ProjectFilter[] = ['All', 'Frontend', 'Backend', 'Mobile'];

const ProjectExplorer = ({ projects }: ProjectExplorerProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visibleProjects = useMemo(
    () =>
      projects.filter(project => {
        const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
        const searchableText =
          `${project.title} ${project.summary} ${project.technologies.join(' ')}`.toLowerCase();
        return matchesCategory && searchableText.includes(deferredQuery);
      }),
    [activeFilter, deferredQuery, projects]
  );

  return (
    <div className="project-explorer">
      <div className="project-explorer__toolbar glass-panel">
        <div className="project-explorer__filters" aria-label="Filter projects">
          {filters.map(filter => (
            <button
              key={filter}
              type="button"
              className="filter-button"
              data-active={activeFilter === filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="project-search">
          <span className="sr-only">Search projects</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search technology or product"
            autoComplete="off"
          />
        </label>
      </div>

      <p className="project-explorer__count" aria-live="polite">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.article
              layout
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.15) }}
            >
              <div className="project-card__topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="project-card__category">{project.category}</span>
              </div>

              <div>
                {project.featured ? (
                  <span className="project-card__featured">Selected work</span>
                ) : null}
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>

              <div className="project-card__footer">
                <ul aria-label={`${project.title} technologies`}>
                  {project.technologies.slice(0, 4).map(technology => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} repository`}
                  >
                    View repository <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="project-card__private">Private product</span>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleProjects.length === 0 ? (
        <div className="project-empty" role="status">
          <span aria-hidden="true">⌁</span>
          <h3>No matching project</h3>
          <p>Try a different category or technology.</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectExplorer;
