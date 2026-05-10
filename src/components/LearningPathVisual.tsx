import React from 'react';

const pathItems = [
  'LLM Gateway',
  'RAG',
  'Orchestration',
  'MCP Tools',
  'Angular Copilot',
  'QA Browser Agent',
];

export default function LearningPathVisual(): React.ReactElement {
  return (
    <div className="learning-path-visual" aria-label="Learning path visual">
      {pathItems.map((item, index) => (
        <React.Fragment key={item}>
          <div className="learning-path-visual__node ae-card ae-card-subtle">
            <span className="learning-path-visual__node-index">{index + 1}</span>
            <div className="learning-path-visual__node-body ae-stack-sm">
              <span className="project-status-card__label">Layer {index + 1}</span>
              <strong className="learning-path-visual__node-title">{item}</strong>
            </div>
          </div>
          {index < pathItems.length - 1 ? <div className="learning-path-visual__connector" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
