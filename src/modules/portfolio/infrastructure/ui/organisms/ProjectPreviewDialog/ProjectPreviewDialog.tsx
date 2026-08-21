import { useLayoutEffect, useRef, type CSSProperties } from 'react';

import type { Project } from '@portfolio/domain/models/Portfolio';

import './ProjectPreviewDialog.css';

interface ProjectPreviewDialogProps {
  project: Project | null;
  src: string | null;
  transitionName?: string;
  onRequestClose: () => void;
}

const ProjectPreviewDialog = ({
  project,
  src,
  transitionName,
  onRequestClose,
}: ProjectPreviewDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    document.documentElement.dataset.projectPreviewOpen = 'true';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    closeButtonRef.current?.focus();

    return () => {
      delete document.documentElement.dataset.projectPreviewOpen;
      if (dialog.open && typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    };
  }, [project]);

  if (!project?.preview || !src) return null;

  const titleId = `project-preview-title-${project.id}`;

  return (
    <dialog
      ref={dialogRef}
      className="project-preview-dialog"
      aria-labelledby={titleId}
      onCancel={event => {
        event.preventDefault();
        onRequestClose();
      }}
    >
      <article className="project-preview-dialog__panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="project-preview-dialog__close"
          aria-label={`Close ${project.title} image`}
          onClick={onRequestClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="project-preview-dialog__media">
          <img
            src={src}
            alt={project.preview.alt}
            width={project.preview.width}
            height={project.preview.height}
            decoding="async"
            style={
              transitionName ? ({ viewTransitionName: transitionName } as CSSProperties) : undefined
            }
          />
        </div>

        <div className="project-preview-dialog__details">
          <div>
            <span>{project.category}</span>
            <h2 id={titleId}>{project.title}</h2>
            <p>{project.summary}</p>
          </div>
          <ul aria-label={`${project.title} technologies`}>
            {project.technologies.map(technology => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {project.repositoryUrl ? (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              View repository <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="project-preview-dialog__private">Private product</span>
          )}
        </div>
      </article>
    </dialog>
  );
};

export default ProjectPreviewDialog;
