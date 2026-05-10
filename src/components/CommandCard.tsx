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
    <div className="command-card">
      <div className="command-card__header">
        <strong>{title}</strong>
        <span>{language}</span>
      </div>
      <pre className="command-card__body">
        <code>{commands.join('\n')}</code>
      </pre>
    </div>
  );
}
