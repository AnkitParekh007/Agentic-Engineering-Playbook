import React from 'react';

const architectureNodes = [
  { title: 'Angular Copilot UI', tone: 'ui' },
  { title: 'Agent Workflow Orchestrator', tone: 'orchestrator' },
  { title: 'Enterprise RAG Copilot', tone: 'rag' },
  { title: 'MCP Enterprise Toolkit', tone: 'mcp' },
  { title: 'QA Browser Agent', tone: 'qa' },
  { title: 'AI Provider Gateway', tone: 'gateway' },
];

export default function ArchitecturePreview(): React.ReactElement {
  return (
    <div className="architecture-preview" aria-label="Architecture preview">
      <div className="architecture-preview__grid">
        {architectureNodes.map((node) => (
          <article
            key={node.title}
            className={`architecture-preview__node architecture-preview__node--${node.tone} ae-card ae-card-subtle`}
          >
            <span className="architecture-preview__chip ae-badge ae-badge-info">{node.tone}</span>
            <strong className="ae-card-title">{node.title}</strong>
          </article>
        ))}
      </div>
      <div className="architecture-preview__lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
