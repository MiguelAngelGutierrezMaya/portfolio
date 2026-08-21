import type { CSSProperties } from 'react';

import type { ProjectPreview } from '@portfolio/domain/models/Portfolio';

import './ProjectPreviewButton.css';

interface ProjectPreviewButtonProps {
  projectTitle: string;
  preview: ProjectPreview;
  src: string;
  transitionName?: string;
  onOpen: (trigger: HTMLButtonElement) => void;
}

const ProjectPreviewButton = ({
  projectTitle,
  preview,
  src,
  transitionName,
  onOpen,
}: ProjectPreviewButtonProps) => (
  <button
    type="button"
    className="project-preview-button project-card__preview-frame"
    aria-label={`View ${projectTitle} image in detail`}
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
      <span>View larger</span>
      <span>↗</span>
    </span>
  </button>
);

export default ProjectPreviewButton;
