import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug', 'b0a'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/config',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/config', 'dc1'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/content',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/content', '300'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/globalData',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/globalData', 'bae'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/metadata',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/metadata', 'd3d'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/registry',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/registry', '258'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/__docusaurus/debug/routes',
    component: ComponentCreator('/agentic-engineering-playbook/__docusaurus/debug/routes', 'c68'),
    exact: true
  },
  {
    path: '/agentic-engineering-playbook/docs',
    component: ComponentCreator('/agentic-engineering-playbook/docs', '7ab'),
    routes: [
      {
        path: '/agentic-engineering-playbook/docs',
        component: ComponentCreator('/agentic-engineering-playbook/docs', '0f3'),
        routes: [
          {
            path: '/agentic-engineering-playbook/docs',
            component: ComponentCreator('/agentic-engineering-playbook/docs', '703'),
            routes: [
              {
                path: '/agentic-engineering-playbook/docs/agent-frameworks/crewai-openai-agents-adk',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agent-frameworks/crewai-openai-agents-adk', '46e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agent-frameworks/langgraph-state-machines',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agent-frameworks/langgraph-state-machines', '532'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agent-frameworks/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agent-frameworks/overview', '8d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agent-frameworks/project-langgraph-orchestrator',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agent-frameworks/project-langgraph-orchestrator', '56d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agentic-ui/ag-ui-event-streams',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agentic-ui/ag-ui-event-streams', 'e5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agentic-ui/angular-copilot-ux-patterns',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agentic-ui/angular-copilot-ux-patterns', 'b58'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agentic-ui/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agentic-ui/overview', '7c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/agentic-ui/project-angular-agentic-copilot',
                component: ComponentCreator('/agentic-engineering-playbook/docs/agentic-ui/project-angular-agentic-copilot', 'e3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/career-monetization/course-funnel',
                component: ComponentCreator('/agentic-engineering-playbook/docs/career-monetization/course-funnel', '5a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/career-monetization/job-search-system',
                component: ComponentCreator('/agentic-engineering-playbook/docs/career-monetization/job-search-system', 'c4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/career-monetization/monetization-roadmap',
                component: ComponentCreator('/agentic-engineering-playbook/docs/career-monetization/monetization-roadmap', '102'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/career-monetization/portfolio-strategy',
                component: ComponentCreator('/agentic-engineering-playbook/docs/career-monetization/portfolio-strategy', '3da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/cloud-deployment/aws-free-tier-path',
                component: ComponentCreator('/agentic-engineering-playbook/docs/cloud-deployment/aws-free-tier-path', 'bb6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/cloud-deployment/docker-and-ci-cd',
                component: ComponentCreator('/agentic-engineering-playbook/docs/cloud-deployment/docker-and-ci-cd', 'e2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/cloud-deployment/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/cloud-deployment/overview', '3de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/evals-observability/agent-evaluation-methods',
                component: ComponentCreator('/agentic-engineering-playbook/docs/evals-observability/agent-evaluation-methods', '0c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/evals-observability/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/evals-observability/overview', 'f99'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/evals-observability/traces-metrics-costs',
                component: ComponentCreator('/agentic-engineering-playbook/docs/evals-observability/traces-metrics-costs', '41e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/llm-foundations/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/llm-foundations/overview', 'ae5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/llm-foundations/project-ai-provider-gateway',
                component: ComponentCreator('/agentic-engineering-playbook/docs/llm-foundations/project-ai-provider-gateway', '71b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/llm-foundations/prompt-contracts',
                component: ComponentCreator('/agentic-engineering-playbook/docs/llm-foundations/prompt-contracts', '34a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/llm-foundations/streaming-and-structured-output',
                component: ComponentCreator('/agentic-engineering-playbook/docs/llm-foundations/streaming-and-structured-output', 'bf0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/production-security/enterprise-readiness-checklist',
                component: ComponentCreator('/agentic-engineering-playbook/docs/production-security/enterprise-readiness-checklist', 'a6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/production-security/guardrails-permissions-approvals',
                component: ComponentCreator('/agentic-engineering-playbook/docs/production-security/guardrails-permissions-approvals', 'd42'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/production-security/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/production-security/overview', 'bba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/production-security/prompt-injection-threat-model',
                component: ComponentCreator('/agentic-engineering-playbook/docs/production-security/prompt-injection-threat-model', 'd86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/rag-systems/chunking-embeddings-vector-search',
                component: ComponentCreator('/agentic-engineering-playbook/docs/rag-systems/chunking-embeddings-vector-search', 'a14'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/rag-systems/hybrid-search-reranking-citations',
                component: ComponentCreator('/agentic-engineering-playbook/docs/rag-systems/hybrid-search-reranking-citations', '37f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/rag-systems/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/rag-systems/overview', '668'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/rag-systems/project-enterprise-rag-copilot',
                component: ComponentCreator('/agentic-engineering-playbook/docs/rag-systems/project-enterprise-rag-copilot', '6fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/start-here/how-to-use-this-playbook',
                component: ComponentCreator('/agentic-engineering-playbook/docs/start-here/how-to-use-this-playbook', 'c39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/start-here/learning-path',
                component: ComponentCreator('/agentic-engineering-playbook/docs/start-here/learning-path', 'd80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/start-here/project-ladder',
                component: ComponentCreator('/agentic-engineering-playbook/docs/start-here/project-ladder', '9fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/start-here/vision',
                component: ComponentCreator('/agentic-engineering-playbook/docs/start-here/vision', '4e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/tool-calling-mcp/mcp-server-client-basics',
                component: ComponentCreator('/agentic-engineering-playbook/docs/tool-calling-mcp/mcp-server-client-basics', '7b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/tool-calling-mcp/overview',
                component: ComponentCreator('/agentic-engineering-playbook/docs/tool-calling-mcp/overview', '256'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/tool-calling-mcp/project-mcp-enterprise-toolkit',
                component: ComponentCreator('/agentic-engineering-playbook/docs/tool-calling-mcp/project-mcp-enterprise-toolkit', 'fd8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/agentic-engineering-playbook/docs/tool-calling-mcp/tool-calling-patterns',
                component: ComponentCreator('/agentic-engineering-playbook/docs/tool-calling-mcp/tool-calling-patterns', 'f93'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
