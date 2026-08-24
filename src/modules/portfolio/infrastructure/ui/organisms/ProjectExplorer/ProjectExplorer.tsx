import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import type { Project, ProjectCategory } from '@portfolio/domain/models/Portfolio';
import { createManagedMediaDeliveryPath } from '@portfolio/infrastructure/media/managedMediaPath';
import ProjectPreviewButton from '@portfolio/infrastructure/ui/molecules/ProjectPreviewButton/ProjectPreviewButton';
import ProjectPreviewDialog from '@portfolio/infrastructure/ui/organisms/ProjectPreviewDialog/ProjectPreviewDialog';

import './ProjectExplorer.css';

interface ProjectExplorerProps {
  projects: readonly Project[];
}

type ProjectFilter = 'All' | ProjectCategory;

const filters: ProjectFilter[] = ['All', 'Frontend', 'Backend', 'Mobile'];
const initialProjectCount = 9;
const loadMotionFeatures = () => import('./motionFeatures').then(module => module.default);
const createTransitionName = (projectId: string) =>
  `project-preview-${projectId.replaceAll(/[^a-z0-9-]/gi, '-')}`;

interface PreviewViewTransition {
  readonly finished: Promise<unknown>;
}

type PreviewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => PreviewViewTransition;
};

const projectImageDecodeTimeoutMs = 160;
const canUsePreviewViewTransition = (): boolean =>
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
  typeof (document as PreviewTransitionDocument).startViewTransition === 'function';

const waitForProjectPreviewImage = async (): Promise<void> => {
  const image = document.querySelector<HTMLImageElement>('[data-project-preview-image]');
  if (!image || (image.complete && image.naturalWidth > 0) || typeof image.decode !== 'function') {
    return;
  }

  await Promise.race([
    image.decode().catch(() => undefined),
    new Promise<void>(resolve => window.setTimeout(resolve, projectImageDecodeTimeoutMs)),
  ]);
};

const commitPreviewUpdate = (update: () => void) => {
  // View Transitions must snapshot the DOM immediately before and after this state change.
  // eslint-disable-next-line @eslint-react/dom-no-flush-sync
  flushSync(update);
};

const updateWithPreviewTransition = async (
  update: () => void,
  prepareNextView?: () => Promise<void>
): Promise<void> => {
  const transitionDocument = document as PreviewTransitionDocument;

  if (!canUsePreviewViewTransition() || !transitionDocument.startViewTransition) {
    commitPreviewUpdate(update);
    return;
  }

  document.documentElement.dataset.projectPreviewTransition = 'true';
  let didCommitUpdate = false;
  try {
    const transition = transitionDocument.startViewTransition(async () => {
      commitPreviewUpdate(update);
      didCommitUpdate = true;
      await prepareNextView?.();
    });
    await transition.finished.catch(() => undefined);
  } catch {
    if (!didCommitUpdate) commitPreviewUpdate(update);
  } finally {
    delete document.documentElement.dataset.projectPreviewTransition;
  }
};

const ProjectExplorer = ({ projects }: ProjectExplorerProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [query, setQuery] = useState('');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [transitionProjectId, setTransitionProjectId] = useState<string | null>(null);
  const [usesSharedTransition, setUsesSharedTransition] = useState(false);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const matchingProjects = useMemo(
    () =>
      projects.filter(project => {
        const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
        const searchableText =
          `${project.title} ${project.summary} ${project.technologies.join(' ')}`.toLowerCase();
        return matchesCategory && searchableText.includes(deferredQuery);
      }),
    [activeFilter, deferredQuery, projects]
  );
  const isDiscoveringProjects = activeFilter !== 'All' || deferredQuery.length > 0;
  const visibleProjects =
    showAllProjects || isDiscoveringProjects
      ? matchingProjects
      : matchingProjects.slice(0, initialProjectCount);
  const hasHiddenProjects = visibleProjects.length < matchingProjects.length;

  const openProjectPreview = (project: Project, trigger: HTMLButtonElement) => {
    previewTriggerRef.current = trigger;
    commitPreviewUpdate(() => {
      setTransitionProjectId(project.id);
      setUsesSharedTransition(canUsePreviewViewTransition());
    });
    void updateWithPreviewTransition(() => setSelectedProject(project), waitForProjectPreviewImage);
  };

  const closeProjectPreview = () => {
    const trigger = previewTriggerRef.current;
    void updateWithPreviewTransition(() => setSelectedProject(null)).finally(() => {
      commitPreviewUpdate(() => {
        setTransitionProjectId(null);
        setUsesSharedTransition(false);
      });
      trigger?.focus();
    });
  };

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
            id="project-search"
            name="project-search"
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

      <LazyMotion features={loadMotionFeatures} strict>
        <m.div layout className="project-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <m.article
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

                {project.preview ? (
                  project.preview.presentation === 'generic' ? (
                    <div className="project-card__preview-frame">
                      <img
                        className="project-card__preview"
                        src={createManagedMediaDeliveryPath(project.preview.src)}
                        alt={project.preview.alt}
                        width={project.preview.width}
                        height={project.preview.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <ProjectPreviewButton
                      projectTitle={project.title}
                      preview={project.preview}
                      src={createManagedMediaDeliveryPath(project.preview.src)}
                      transitionName={
                        transitionProjectId === project.id && selectedProject?.id !== project.id
                          ? createTransitionName(project.id)
                          : undefined
                      }
                      onOpen={trigger => openProjectPreview(project, trigger)}
                    />
                  )
                ) : null}

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
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      <span className="sr-only">{project.title}: </span>
                      View repository <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="project-card__private">Private product</span>
                  )}
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>
      </LazyMotion>

      {hasHiddenProjects ? (
        <div className="project-explorer__more">
          <button type="button" onClick={() => setShowAllProjects(true)}>
            Show all {matchingProjects.length} projects <span aria-hidden="true">↓</span>
          </button>
        </div>
      ) : null}

      {visibleProjects.length === 0 ? (
        <div className="project-empty" role="status">
          <span aria-hidden="true">⌁</span>
          <h3>No matching project</h3>
          <p>Try a different category or technology.</p>
        </div>
      ) : null}

      <ProjectPreviewDialog
        project={selectedProject}
        usesSharedTransition={usesSharedTransition}
        src={
          selectedProject?.preview
            ? createManagedMediaDeliveryPath(selectedProject.preview.src)
            : null
        }
        transitionName={
          selectedProject && transitionProjectId === selectedProject.id
            ? createTransitionName(selectedProject.id)
            : undefined
        }
        onRequestClose={closeProjectPreview}
      />
    </div>
  );
};

export default ProjectExplorer;
