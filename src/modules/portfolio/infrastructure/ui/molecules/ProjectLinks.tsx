import type { ProjectExplorerCopy } from '@i18n/infrastructure/uiCopy';
import type { Project } from '@portfolio/domain/models/Portfolio';

interface Props {
  project: Project;
  copy: ProjectExplorerCopy;
  privateClassName: string;
}

export default function ProjectLinks({ project, copy, privateClassName }: Props) {
  if (!project.websiteUrl && !project.repositoryUrl) {
    return <span className={privateClassName}>{copy.privateProduct}</span>;
  }

  return (
    <div className="project-links">
      {[
        [project.websiteUrl, copy.visitWebsite],
        [project.repositoryUrl, copy.viewRepository],
      ].map(([href, label]) =>
        href ? (
          <a key={href} href={href} target="_blank" rel="noreferrer">
            <span className="sr-only">{project.title}: </span>
            {label} <span aria-hidden="true">↗</span>
          </a>
        ) : null
      )}
    </div>
  );
}
