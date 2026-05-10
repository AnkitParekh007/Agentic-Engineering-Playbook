import React from 'react';

type CommandCardProps = {
  title: string;
  commands: string[];
  language?: string;
};

export default function CommandCard({
  title,
  commands,
  language = 'bash',
}: CommandCardProps): React.ReactElement {
  return (
    <div className="command-card ae-card ae-card-strong">
      <div className="command-card__header ae-card-header">
        <strong className="ae-card-title">{title}</strong>
        <span>{language}</span>
      </div>
      <pre className="command-card__body">
        <code>{commands.join('\n')}</code>
      </pre>
    </div>
  );
}
