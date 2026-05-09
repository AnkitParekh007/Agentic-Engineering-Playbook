import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Start Here',
      items: [
        '00-start-here/vision',
        '00-start-here/how-to-use-this-playbook',
        '00-start-here/learning-path',
        '00-start-here/project-ladder'
      ]
    },
    {
      type: 'category',
      label: 'Layer 1: LLM Foundations',
      items: [
        '01-llm-foundations/overview',
        '01-llm-foundations/prompt-contracts',
        '01-llm-foundations/streaming-and-structured-output',
        '01-llm-foundations/project-ai-provider-gateway'
      ]
    },
    {
      type: 'category',
      label: 'Layer 2: RAG Systems',
      items: [
        '02-rag-systems/overview',
        '02-rag-systems/chunking-embeddings-vector-search',
        '02-rag-systems/hybrid-search-reranking-citations',
        '02-rag-systems/project-enterprise-rag-copilot'
      ]
    },
    {
      type: 'category',
      label: 'Layer 3: Agent Frameworks',
      items: [
        '03-agent-frameworks/overview',
        '03-agent-frameworks/langgraph-state-machines',
        '03-agent-frameworks/crewai-openai-agents-adk',
        '03-agent-frameworks/project-langgraph-orchestrator'
      ]
    },
    {
      type: 'category',
      label: 'Layer 4: Tools + MCP',
      items: [
        '04-tool-calling-mcp/overview',
        '04-tool-calling-mcp/tool-calling-patterns',
        '04-tool-calling-mcp/mcp-server-client-basics',
        '04-tool-calling-mcp/project-mcp-enterprise-toolkit'
      ]
    },
    {
      type: 'category',
      label: 'Layer 5: Agentic UI',
      items: [
        '05-agentic-ui/overview',
        '05-agentic-ui/ag-ui-event-streams',
        '05-agentic-ui/angular-copilot-ux-patterns',
        '05-agentic-ui/project-angular-agentic-copilot'
      ]
    },
    {
      type: 'category',
      label: 'Layer 6: Production + Security',
      items: [
        '06-production-security/overview',
        '06-production-security/guardrails-permissions-approvals',
        '06-production-security/prompt-injection-threat-model',
        '06-production-security/enterprise-readiness-checklist'
      ]
    },
    {
      type: 'category',
      label: 'Layer 7: Evals + Observability',
      items: [
        '07-evals-observability/overview',
        '07-evals-observability/agent-evaluation-methods',
        '07-evals-observability/traces-metrics-costs'
      ]
    },
    {
      type: 'category',
      label: 'Layer 8: Cloud Deployment',
      items: [
        '08-cloud-deployment/overview',
        '08-cloud-deployment/docker-and-ci-cd',
        '08-cloud-deployment/aws-free-tier-path'
      ]
    },
    {
      type: 'category',
      label: 'Career + Monetization',
      items: [
        '09-career-monetization/portfolio-strategy',
        '09-career-monetization/monetization-roadmap',
        '09-career-monetization/course-funnel',
        '09-career-monetization/job-search-system'
      ]
    }
  ]
};

export default sidebars;
