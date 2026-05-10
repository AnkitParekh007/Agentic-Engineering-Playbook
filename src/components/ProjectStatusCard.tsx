import React from 'react';
import Link from '@docusaurus/Link';

type ProjectStatusCardProps = {
  status: string;
  folderHref: string;
  stack: string[];
  proves: string;
  nextUpgrade: string;
};

export default function ProjectStatusCard({
  status,
  folderHref,
  stack,
  proves,
  nextUpgrade,
}: ProjectStatusCardProps): React.ReactElement {
  return (
    <div className="project-status-card">
      <div className="project-status-card__topline">
        <span className="project-status-card__status">{status}</span>
        <Link className="project-status-card__folder" href={folderHref}>
          Open folder
        </Link>
      </div>

      <div className="project-status-card__grid">
        <div>
          <p className="project-status-card__label">Stack</p>
          <div className="project-status-card__stack">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="project-status-card__label">What it proves</p>
          <p>{proves}</p>
        </div>

        <div>
          <p className="project-status-card__label">Next upgrade path</p>
          <p>{nextUpgrade}</p>
        </div>
      </div>
    </div>
  );
}
