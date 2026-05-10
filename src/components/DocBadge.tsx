import React from 'react';

type DocBadgeTone =
  | 'concept'
  | 'production'
  | 'build'
  | 'eval'
  | 'security'
  | 'portfolio';

type DocBadgeProps = {
  tone: DocBadgeTone;
  children: React.ReactNode;
};

export default function DocBadge({ tone, children }: DocBadgeProps): React.ReactElement {
  return <span className={`doc-badge doc-badge--${tone}`}>{children}</span>;
}
