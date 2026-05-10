import React from 'react';

type DocBadgeTone =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

type DocBadgeProps = {
  label: string;
  tone: DocBadgeTone;
};

export default function DocBadge({ label, tone }: DocBadgeProps): React.ReactElement {
  return <span className={`doc-badge ae-badge ae-badge-${tone}`}>{label}</span>;
}
