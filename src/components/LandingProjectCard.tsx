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
    <article className="landing-project-card ae-card ae-card-glow">
      <div className="landing-project-card__topline ae-card-header">
        <span className="landing-project-card__id">{project.id}</span>
        <span className="landing-project-card__status ae-badge ae-badge-success">Runnable</span>
      </div>
      <h3 className="ae-card-title">{project.name}</h3>
      <p className="landing-project-card__teaches ae-card-description">{project.teaches}</p>
      <p className="landing-project-card__stack">{project.stack}</p>
      <div className="landing-project-card__actions">
        <Link className="landing-inline-link ae-link-pill" to={project.docPath}>
          Project docs
        </Link>
        <Link className="landing-inline-link ae-link-pill" href={project.folderHref}>
          Project folder
        </Link>
      </div>
    </article>
  );
}
