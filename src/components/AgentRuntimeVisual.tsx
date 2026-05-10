import React from 'react';

const runtimeStages = [
  { label: 'User request', detail: 'Generate a secure travel copilot for finance.' },
  { label: 'Planner', detail: 'Break work into gateway, RAG, approval, and QA steps.' },
  { label: 'Retrieval', detail: 'Pull policy context and prior incident examples.' },
  { label: 'Tool call', detail: 'Fetch internal docs and repo metadata through safe tools.' },
  { label: 'Approval', detail: 'Pause on sensitive actions and capture operator reason.' },
  { label: 'Eval', detail: 'Check grounding, latency, and execution quality before release.' },
];

export default function AgentRuntimeVisual(): React.ReactElement {
  return (
    <div className="agent-runtime-visual" aria-label="Agent runtime visual">
      <div className="agent-runtime-visual__header">
        <span className="agent-runtime-visual__eyebrow">Agent runtime console</span>
        <span className="agent-runtime-visual__live">Live pipeline</span>
      </div>

      <div className="agent-runtime-visual__layout">
        <div className="agent-runtime-visual__timeline">
          {runtimeStages.map((stage, index) => (
            <div key={stage.label} className="agent-runtime-step">
              <div className="agent-runtime-step__index">{index + 1}</div>
              <div className="agent-runtime-step__body">
                <strong>{stage.label}</strong>
                <p>{stage.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="agent-runtime-visual__answer">
          <div className="agent-runtime-visual__terminal">
            <span className="agent-runtime-visual__dot" />
            <span className="agent-runtime-visual__dot" />
            <span className="agent-runtime-visual__dot" />
            <code>run agent --mode orchestrate --env test</code>
          </div>

          <div className="agent-runtime-visual__answer-card">
            <p className="agent-runtime-visual__answer-label">Final answer</p>
            <h3>Production path ready</h3>
            <p>
              Gateway selected, RAG citations attached, approvals enforced, and QA run staged for
              release confidence.
            </p>
            <div className="agent-runtime-visual__metrics">
              <span>Latency 842ms</span>
              <span>Tools 3</span>
              <span>Eval pass</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
