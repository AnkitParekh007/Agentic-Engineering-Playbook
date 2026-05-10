import React from 'react';
import Link from '@docusaurus/Link';

type ProjectStatusCardProps = {
  project: string;
  status: string;
  stack: string | string[];
  folderHref: string;
  commands: string[];
  proves: string;
  next: string;
};

export default function ProjectStatusCard({
  project,
  status,
  stack,
  folderHref,
  commands,
  proves,
  next,
}: ProjectStatusCardProps): React.ReactElement {
  const stackItems = Array.isArray(stack)
    ? stack
    : stack.split(',').map((item) => item.trim()).filter(Boolean);

  return (
    <section className="project-status-card ae-card ae-card-glow">
      <div className="project-status-card__topline ae-card-header">
        <div className="ae-stack-sm">
          <span className="project-status-card__label">Project implementation</span>
          <strong className="ae-card-title">{project}</strong>
        </div>
        <span className="project-status-card__status ae-badge ae-badge-success">{status}</span>
      </div>

      <div className="project-status-card__grid">
        <div className="ae-stack-sm">
          <p className="project-status-card__label">Stack</p>
          <div className="project-status-card__stack">
            {stackItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="ae-stack-sm">
          <p className="project-status-card__label">Folder</p>
          <Link className="project-status-card__folder ae-link-pill" href={folderHref}>
            Open project folder
          </Link>
        </div>

        <div className="ae-stack-sm">
          <p className="project-status-card__label">What it proves</p>
          <p className="ae-card-description">{proves}</p>
        </div>

        <div className="ae-stack-sm">
          <p className="project-status-card__label">Next upgrade path</p>
          <p className="ae-card-description">{next}</p>
        </div>
      </div>

      <div className="project-status-card__commands ae-stack-sm">
        <p className="project-status-card__label">Key commands</p>
        <pre className="project-status-card__command-list">
          <code>{commands.join('\n')}</code>
        </pre>
      </div>
    </section>
  );
}
