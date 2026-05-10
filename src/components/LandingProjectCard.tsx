import React from 'react';
import Link from '@docusaurus/Link';

export type LandingProject = {
  id: string;
  name: string;
  teaches: string;
  stack: string;
  docPath: string;
  folderHref: string;
};

type LandingProjectCardProps = {
  project: LandingProject;
};

export default function LandingProjectCard({
  project,
}: LandingProjectCardProps): React.ReactElement {
  return (
    <article className="landing-project-card">
      <div className="landing-project-card__topline">
        <span className="landing-project-card__id">{project.id}</span>
        <span className="landing-project-card__status">Runnable</span>
      </div>
      <h3>{project.name}</h3>
      <p className="landing-project-card__teaches">{project.teaches}</p>
      <p className="landing-project-card__stack">{project.stack}</p>
      <div className="landing-project-card__actions">
        <Link className="landing-inline-link" to={project.docPath}>
          Project docs
        </Link>
        <Link className="landing-inline-link" href={project.folderHref}>
          Project folder
        </Link>
      </div>
    </article>
  );
}
