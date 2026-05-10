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
          <div className="learning-path-visual__node">
            <span className="learning-path-visual__node-index">{index + 1}</span>
            <strong>{item}</strong>
          </div>
          {index < pathItems.length - 1 ? <div className="learning-path-visual__connector" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
