import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const highlights = [
  {
    icon: '◎',
    title: 'Portfolio-grade builds',
    body: 'Ship 6 serious agentic systems instead of collecting disconnected prompt demos.',
  },
  {
    icon: '◈',
    title: 'Dual-stack implementation',
    body: 'Learn the TypeScript application path and the Python backend path side by side.',
  },
  {
    icon: '✦',
    title: 'Production controls',
    body: 'Treat evals, guardrails, traces, CI/CD, and deployment as core engineering work.',
  },
];

const layers = [
  {
    id: '01',
    icon: '◌',
    title: 'LLM Foundations',
    body: 'Provider gateways, prompt contracts, structured outputs, and streaming response design.',
  },
  {
    id: '02',
    icon: '⌘',
    title: 'RAG Systems',
    body: 'Chunking, retrieval, reranking, citations, and grounded enterprise knowledge flows.',
  },
  {
    id: '03',
    icon: '⟐',
    title: 'Agent Frameworks',
    body: 'State machines, workflow orchestration, retries, approvals, and replayable runs.',
  },
  {
    id: '04',
    icon: '◫',
    title: 'Tools and MCP',
    body: 'Model-safe tool schemas, MCP servers, capability routing, and enterprise integrations.',
  },
  {
    id: '05',
    icon: '◭',
    title: 'Agentic UI',
    body: 'Copilot timelines, approvals, event streams, evidence panels, and operator workflows.',
  },
  {
    id: '06',
    icon: '⬡',
    title: 'Production Security',
    body: 'Prompt injection defense, permissions, isolation, approval gates, and readiness controls.',
  },
  {
    id: '07',
    icon: '◍',
    title: 'Evals and Observability',
    body: 'Offline evals, traces, runtime metrics, cost controls, and release confidence.',
  },
  {
    id: '08',
    icon: '△',
    title: 'Cloud Deployment',
    body: 'Containers, CI/CD, environment strategy, rollout discipline, and operating posture.',
  },
];

const signals = [
  {
    icon: '↗',
    title: 'Buildable',
    body: 'Each chapter should move the learner toward a working artifact, not a conceptual dead end.',
  },
  {
    icon: '≋',
    title: 'Inspectable',
    body: 'Plans, tools, evidence, approvals, and traces are visible because modern AI systems need auditability.',
  },
  {
    icon: '◇',
    title: 'Commercially useful',
    body: 'The playbook is designed to produce hiring signal, consulting leverage, and product-ready building blocks.',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Agentic Engineering Playbook"
      description="A modern open-source learning platform for building production-grade AI agents, copilots, and runtimes."
    >
      <main className="landing">
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <p className="eyebrow">Open-source AI systems curriculum</p>
              <span className="signal-pill">Agents • RAG • MCP • Copilots</span>
            </div>
            <h1>Design, ship, and harden modern AI products.</h1>
            <p className="hero-text">
              Agentic Engineering Playbook is a GitBook-style platform for developers who want to build
              production-grade agent runtimes, RAG systems, tool-using workflows, and operator-facing AI
              interfaces with engineering discipline.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary button--lg" to="/docs/start-here/learning-path">
                Start the playbook
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/start-here/project-ladder">
                Explore projects
              </Link>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>6</strong>
                <span>core projects</span>
              </div>
              <div>
                <strong>8</strong>
                <span>learning layers</span>
              </div>
              <div>
                <strong>1</strong>
                <span>production mindset</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <p className="hero-card-title">Build track</p>
            <div className="build-stack">
              <article>
                <span>◎</span>
                <div>
                  <h3>Provider Gateway</h3>
                  <p>Normalize model access, streaming, schemas, and runtime cost visibility.</p>
                </div>
              </article>
              <article>
                <span>⌘</span>
                <div>
                  <h3>Enterprise RAG</h3>
                  <p>Ground answers in documents, citations, and retrieval quality controls.</p>
                </div>
              </article>
              <article>
                <span>⟐</span>
                <div>
                  <h3>Agent Runtime</h3>
                  <p>Model explicit state, tools, retries, approvals, and inspection surfaces.</p>
                </div>
              </article>
              <article>
                <span>◭</span>
                <div>
                  <h3>Operator UI</h3>
                  <p>Surface plans, events, approvals, sources, and execution timelines clearly.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="value-grid">
          {highlights.map((item) => (
            <article key={item.title} className="value-card">
              <span className="value-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Curriculum architecture</p>
            <h2>Each layer moves from concept to system design to a buildable project.</h2>
            <p>
              The sequence is opinionated on purpose: learn the runtime primitives first, then compound them
              into grounded, tool-using, production-aware AI applications.
            </p>
          </div>
          <div className="layer-grid">
            {layers.map((layer) => (
              <article key={layer.id} className="layer-card">
                <div className="layer-topline">
                  <span className="layer-id">{layer.id}</span>
                  <span className="layer-icon">{layer.icon}</span>
                </div>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-alt">
          <div className="section-heading">
            <p className="eyebrow">AI-specific learning design</p>
            <h2>Built for developers who want operational fluency, not just model familiarity.</h2>
          </div>
          <div className="outcome-grid">
            {signals.map((item) => (
              <article key={item.title}>
                <span className="outcome-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
