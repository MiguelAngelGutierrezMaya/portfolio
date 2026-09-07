import type { CSSProperties } from 'react';

import type { ProjectPreview } from '@portfolio/domain/models/Portfolio';

import './ProjectPreviewButton.css';

interface ProjectPreviewButtonProps {
  preview: ProjectPreview;
  src: string;
  transitionName?: string;
  ariaLabel: string;
  actionLabel: string;
  onOpen: (trigger: HTMLButtonElement) => void;
}

const ProjectPreviewButton = ({
  preview,
  src,
  transitionName,
  ariaLabel,
  actionLabel,
  onOpen,
}: ProjectPreviewButtonProps) => (
  <button
    type="button"
    className="project-preview-button project-card__preview-frame"
    aria-label={ariaLabel}
    aria-haspopup="dialog"
    onClick={event => onOpen(event.currentTarget)}
  >
    <img
      className="project-card__preview"
      src={src}
      alt=""
      width={preview.width}
      height={preview.height}
      loading="lazy"
      decoding="async"
      style={transitionName ? ({ viewTransitionName: transitionName } as CSSProperties) : undefined}
    />
    <span className="project-preview-button__action" aria-hidden="true">
      <span>{actionLabel}</span>
      <span>↗</span>
    </span>
  </button>
);

export default ProjectPreviewButton;
