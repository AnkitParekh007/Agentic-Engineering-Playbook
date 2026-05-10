import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import AgentRuntimeVisual from '../components/AgentRuntimeVisual';
import ArchitecturePreview from '../components/ArchitecturePreview';
import LandingProjectCard, { type LandingProject } from '../components/LandingProjectCard';
import LearningPathVisual from '../components/LearningPathVisual';

const projectCards: LandingProject[] = [
  {
    id: 'P01',
    name: 'AI Provider Gateway',
    teaches: 'Provider abstraction, streaming, structured outputs, and trace-aware model access.',
    stack: 'TypeScript, Express, Zod',
    docPath: '/docs/llm-foundations/project-ai-provider-gateway',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p01-ai-provider-gateway',
  },
  {
    id: 'P02',
    name: 'Enterprise RAG Copilot',
    teaches: 'Chunking, retrieval, citations, grounded answers, and eval-first search quality.',
    stack: 'TypeScript, Express, JSON storage',
    docPath: '/docs/rag-systems/project-enterprise-rag-copilot',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p02-enterprise-rag-copilot',
  },
  {
    id: 'P03',
    name: 'Agent Workflow Orchestrator',
    teaches: 'State machines, approvals, retries, tool routing, and inspectable traces.',
    stack: 'TypeScript, Express, workflow runtime',
    docPath: '/docs/agent-frameworks/project-langgraph-orchestrator',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p03-agent-workflow-orchestrator',
  },
  {
    id: 'P04',
    name: 'MCP Enterprise Toolkit',
    teaches: 'Safe read-only tools, schemas, resources, and audit logging for enterprise agents.',
    stack: 'TypeScript, Express, MCP-style APIs',
    docPath: '/docs/tool-calling-mcp/project-mcp-enterprise-toolkit',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p04-mcp-enterprise-toolkit',
  },
  {
    id: 'P05',
    name: 'Angular Agentic Copilot',
    teaches: 'Operator UX, session state, streaming UI, approvals, and visible agent activity.',
    stack: 'Angular, TypeScript, local mock runtime',
    docPath: '/docs/agentic-ui/project-angular-agentic-copilot',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p05-angular-agentic-copilot',
  },
  {
    id: 'P06',
    name: 'QA Browser Agent',
    teaches: 'Safe browser automation, evidence capture, dry-run policy, and deterministic QA evals.',
    stack: 'TypeScript, Playwright, Express',
    docPath: '/docs/agentic-ui/project-qa-browser-agent',
    folderHref:
      'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p06-qa-browser-agent',
  },
];

const differenceCards = [
  {
    title: 'Build-first, not notes-first',
    description: 'Every layer is tied to a runnable system so learners move from reading to implementation quickly.',
  },
  {
    title: 'Production-shaped from day one',
    description: 'The projects emphasize boundaries, validation, traces, and upgrade paths instead of toy demos.',
  },
  {
    title: 'Evals and CI included',
    description: 'Projects ship with smoke checks, eval flows, or build validation so quality is part of the curriculum.',
  },
  {
    title: 'Agent UX is visible',
    description: 'Plans, approvals, tool activity, and browser evidence are surfaced as operator-facing product behavior.',
  },
  {
    title: 'Safety and approvals are core',
    description: 'Read-only tools, dry-run policy, approvals, and environment controls are treated as first-class patterns.',
  },
  {
    title: 'Portfolio-ready projects',
    description: 'The sequence is designed to produce public work samples that show system thinking, not just prompt experiments.',
  },
];

export default function Home(): React.ReactElement {
  const angularCopilotScreenshot = useBaseUrl('/img/screenshots/angular-copilot-demo.png');
  return (
    <Layout
      title="Agentic Engineering Playbook"
      description="Build production-grade AI agents, copilots, and tool-using systems through six runnable projects."
    >
      <main className="academy-home">
        <section className="academy-shell academy-hero">
          <div className="academy-hero__copy">
            <div className="academy-kicker-row">
              <span className="academy-kicker">AI engineering operating system</span>
              <span className="academy-status-pill ae-badge ae-badge-success">6 runnable systems</span>
              <span className="academy-status-pill academy-status-pill--info ae-badge ae-badge-info">CI validated</span>
            </div>

            <h1 className="academy-hero__headline">
              <span>Build production-grade</span>
              <span>AI agents, copilots,</span>
              <span>and tool-using systems.</span>
            </h1>
            <p className="academy-hero__lede">
              Agentic Engineering Playbook teaches real AI agent engineering through six runnable
              projects covering LLM gateways, RAG, orchestration, MCP-style tools, operator UI, and
              browser agents.
            </p>

            <div className="academy-pill-row" aria-label="Topics covered">
              <span>LLM Gateway</span>
              <span>RAG</span>
              <span>Orchestration</span>
              <span>MCP</span>
              <span>Agentic UI</span>
              <span>Browser Agents</span>
            </div>

            <div className="academy-hero__actions">
              <Link className="button button--primary button--lg" to="/docs/start-here/learning-path">
                Start learning
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/start-here/project-ladder">
                Explore projects
              </Link>
              <Link
                className="academy-github-link"
                href="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook"
              >
                View on GitHub
              </Link>
            </div>
          </div>

          <AgentRuntimeVisual />
        </section>

        <section className="academy-shell academy-section">
          <div className="academy-section__header">
            <span className="academy-kicker">Completed projects</span>
            <h2>Six runnable systems, each teaching a different layer of agent engineering.</h2>
            <p>
              This is a buildable curriculum, not a notes dump. Every project is scoped to teach one
              production-shaped system with local validation and a clear upgrade path.
            </p>
          </div>

          <div className="academy-project-grid">
            {projectCards.map((project) => (
              <LandingProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="academy-shell academy-section academy-section--split">
          <div className="academy-section__header">
            <span className="academy-kicker">Learning path</span>
            <h2>Start with runtime basics, then compound them into full agent systems.</h2>
            <p>
              The path is intentionally cumulative: each project becomes infrastructure for the next
              layer of agent capability.
            </p>
          </div>
          <LearningPathVisual />
        </section>

        <section className="academy-shell academy-section">
          <div className="academy-section__header">
            <span className="academy-kicker">Why this is different</span>
            <h2>A serious AI engineering academy, not a generic documentation site.</h2>
          </div>
          <div className="academy-difference-grid">
            {differenceCards.map((item) => (
              <article key={item.title} className="academy-difference-card">
                <span className="academy-difference-card__marker" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="academy-shell academy-section academy-section--two-column">
          <div className="academy-section__header academy-section__header--compact">
            <span className="academy-kicker">Architecture preview</span>
            <h2>See how the systems connect into one agent engineering stack.</h2>
            <p>
              UI, orchestration, retrieval, tools, browser automation, and model access are taught as
              connected layers instead of isolated demos.
            </p>
          </div>
          <ArchitecturePreview />
        </section>

        <section className="academy-shell academy-section academy-section--demo">
          <div className="academy-section__header">
            <span className="academy-kicker">Captured demo assets</span>
            <h2>Real local screenshots now back the launch story.</h2>
            <p>
              These screenshots come from the local production docs build, the Angular copilot UI,
              and the QA Browser Agent report flow. Walkthrough GIFs are still a follow-up asset.
            </p>
          </div>

          <div className="academy-demo-grid">
            <article className="academy-demo-card">
              <div className="academy-demo-card__header">
                <span>P05 capture</span>
                <strong>Angular Copilot UI</strong>
              </div>
              <img
                src={angularCopilotScreenshot}
                alt="Angular Agentic Copilot real local screenshot"
                className="academy-demo-card__image"
              />
            </article>

            <article className="academy-demo-card">
              <div className="academy-demo-card__header">
                <span>P06 capture</span>
                <strong>QA Browser report view</strong>
              </div>
              <div className="academy-report-preview" aria-label="QA Browser Agent report preview">
                <div className="academy-report-preview__meta">
                  <span className="academy-report-preview__status">Completed</span>
                  <span className="academy-report-preview__env">Playground dry-run</span>
                </div>
                <div className="academy-report-preview__summary">
                  <h3>homepage_smoke</h3>
                  <p>
                    Dry run generated a deterministic QA plan for <code>mock://homepage</code> without
                    launching a live browser session.
                  </p>
                </div>
                <div className="academy-report-preview__checks">
                  <div className="academy-report-preview__check">
                    <strong>Check</strong>
                    <span>dry_run_plan_created</span>
                  </div>
                  <div className="academy-report-preview__check">
                    <strong>Trace steps</strong>
                    <span>request_accepted → dry_run_only</span>
                  </div>
                  <div className="academy-report-preview__check">
                    <strong>Safety mode</strong>
                    <span>No browser launched</span>
                  </div>
                </div>
                <div className="academy-report-preview__footer">
                  <span>Report JSON saved locally</span>
                  <code>reports/7a8a76f8...694c.json</code>
                </div>
              </div>
            </article>

            <article className="academy-demo-card">
              <div className="academy-demo-card__header">
                <span>System view</span>
                <strong>Project architecture preview</strong>
              </div>
              <ArchitecturePreview />
            </article>
          </div>
        </section>

        <section className="academy-shell academy-final-cta">
          <div>
            <span className="academy-kicker">Start building</span>
            <h2>Move from AI demos to systems that can be shipped, inspected, and improved.</h2>
          </div>
          <div className="academy-final-cta__actions">
            <Link className="button button--primary button--lg" to="/docs/llm-foundations/project-ai-provider-gateway">
              Start with Project 01
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/start-here/learning-path">
              See the full roadmap
            </Link>
            <Link
              className="academy-github-link academy-github-link--strong"
              href="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook"
            >
              Star the repo
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
