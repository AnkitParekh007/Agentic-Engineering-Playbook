import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Start Here',
      items: [
        'start-here/vision',
        'start-here/how-to-use-this-playbook',
        'start-here/learning-path',
        'start-here/project-ladder',
        'start-here/contributor-quick-start',
        'start-here/contribute-a-chapter',
        'start-here/chapter-template',
        'start-here/project-template',
        'start-here/docs-component-guide',
      ],
    },
    {
      type: 'category',
      label: 'Learning Paths',
      items: [
        'learning-paths/angular-ai-engineer',
        'learning-paths/ai-agentic-engineer',
      ],
    },
    {
      type: 'category',
      label: 'Layer 1: LLM Runtime',
      items: [
        'llm-foundations/overview',
        'llm-foundations/prompt-contracts',
        'llm-foundations/streaming-and-structured-output',
        'llm-foundations/project-ai-provider-gateway',
      ],
    },
    {
      type: 'category',
      label: 'Layer 2: RAG Systems',
      items: [
        'rag-systems/overview',
        'rag-systems/chunking-embeddings-vector-search',
        'rag-systems/hybrid-search-reranking-citations',
        'rag-systems/project-enterprise-rag-copilot',
      ],
    },
    {
      type: 'category',
      label: 'Layer 3: Agent Orchestration',
      items: [
        'agent-frameworks/overview',
        'agent-frameworks/langgraph-state-machines',
        'agent-frameworks/crewai-openai-agents-adk',
        'agent-frameworks/project-langgraph-orchestrator',
      ],
    },
    {
      type: 'category',
      label: 'Layer 4: Tools & MCP',
      items: [
        'tool-calling-mcp/overview',
        'tool-calling-mcp/tool-calling-patterns',
        'tool-calling-mcp/mcp-server-client-basics',
        'tool-calling-mcp/project-mcp-enterprise-toolkit',
      ],
    },
    {
      type: 'category',
      label: 'Layer 5: Agentic UI',
      items: [
        'agentic-ui/overview',
        'agentic-ui/ag-ui-event-streams',
        'agentic-ui/angular-copilot-ux-patterns',
        'agentic-ui/project-angular-agentic-copilot',
        'agentic-ui/project-qa-browser-agent',
      ],
    },
    {
      type: 'category',
      label: 'Layer 6: Security',
      items: [
        'production-security/overview',
        'production-security/guardrails-permissions-approvals',
        'production-security/prompt-injection-threat-model',
        'production-security/enterprise-readiness-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Layer 7: Evals and Observability',
      items: [
        'evals-observability/overview',
        'evals-observability/agent-evaluation-methods',
        'evals-observability/traces-metrics-costs',
      ],
    },
    {
      type: 'category',
      label: 'Layer 8: Deployment',
      items: [
        'cloud-deployment/overview',
        'cloud-deployment/docker-and-ci-cd',
        'cloud-deployment/aws-free-tier-path',
      ],
    },
    {
      type: 'category',
      label: 'Career & Monetization',
      items: [
        'career-monetization/portfolio-strategy',
        'career-monetization/monetization-roadmap',
        'career-monetization/course-funnel',
        'career-monetization/job-search-system',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/weekly-challenge',
        'community/project-submission-template',
      ],
    },
    {
      type: 'category',
      label: 'Open Source',
      items: [
        'open-source/contributing-guide',
        'open-source/open-source-roadmap',
        'open-source/repo-launch-checklist',
        'open-source/visual-quality-checklist',
        'open-source/launch-post-draft',
        'open-source/first-issue-drafts',
      ],
    },
  ],
};

export default sidebars;
