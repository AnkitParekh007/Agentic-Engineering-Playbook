import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const highlights = [
  'Build 6 portfolio-grade agentic projects end to end.',
  'Learn TypeScript and Python implementation patterns side by side.',
  'Move from demos to production controls: guardrails, evals, tracing, CI/CD, and deployment.',
];

const layers = [
  ['01', 'LLM Foundations', 'Provider abstractions, prompt contracts, structured outputs, and streaming UX.'],
  ['02', 'RAG Systems', 'Chunking, embeddings, retrieval, reranking, citations, and enterprise document pipelines.'],
  ['03', 'Agent Frameworks', 'State machines, orchestrators, multi-step workflows, retries, and human approvals.'],
  ['04', 'Tools and MCP', 'Tool schemas, model-safe interfaces, MCP servers, clients, and enterprise integrations.'],
  ['05', 'Agentic UI', 'Angular copilot patterns, event streams, approval cards, task timelines, and operator UX.'],
  ['06', 'Production Security', 'Permissions, prompt injection defense, isolation, approval gates, and readiness.'],
  ['07', 'Evals and Observability', 'Offline evals, traces, cost controls, failure analysis, and release quality.'],
  ['08', 'Cloud Deployment', 'Docker, CI/CD, environment setup, cloud hosting, and staged rollout practices.'],
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Agentic Engineering Playbook"
      description="A practical project-based roadmap for developers becoming AI Agentic Engineers."
    >
      <main className="landing">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Open-source curriculum</p>
            <h1>Learn agentic engineering by shipping real systems.</h1>
            <p className="hero-text">
              Agentic Engineering Playbook is a GitBook-style learning platform for developers who want to
              build production-grade AI copilots, RAG systems, tool-using agents, and operator-facing UIs.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary button--lg" to="/docs/start-here/learning-path">
                Start the roadmap
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/start-here/project-ladder">
                Browse projects
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <p className="hero-card-title">What you will build</p>
            <ul>
              <li>Provider gateway with streaming and structured outputs</li>
              <li>Enterprise RAG copilot with citations and retrieval evaluation</li>
              <li>LangGraph-style orchestrator with tools and approvals</li>
              <li>MCP toolkit for enterprise systems</li>
              <li>Angular agentic copilot UI</li>
              <li>QA browser agent and deployment workflow</li>
            </ul>
          </div>
        </section>

        <section className="value-grid">
          {highlights.map((item) => (
            <article key={item} className="value-card">
              <p>{item}</p>
            </article>
          ))}
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Curriculum architecture</p>
            <h2>Each layer ends in a buildable project.</h2>
          </div>
          <div className="layer-grid">
            {layers.map(([id, title, body]) => (
              <article key={id} className="layer-card">
                <span>{id}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-alt">
          <div className="section-heading">
            <p className="eyebrow">For working developers</p>
            <h2>Designed for portfolio outcomes, not passive reading.</h2>
          </div>
          <div className="outcome-grid">
            <article>
              <h3>Code first</h3>
              <p>Every chapter includes implementation examples, mistakes to avoid, and a mini exercise.</p>
            </article>
            <article>
              <h3>Production aware</h3>
              <p>Security, evals, observability, approval controls, and deployment are part of the main path.</p>
            </article>
            <article>
              <h3>Career aligned</h3>
              <p>Use the repo to build public proof of work, consulting offers, templates, and job-search assets.</p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
