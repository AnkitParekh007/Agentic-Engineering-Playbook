import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Agentic Engineering Playbook',
  tagline: 'A project-first academy for production-grade agents, copilots, RAG, MCP, evals, observability, and agentic UI.',
  favicon: 'img/logo.svg',
  url: 'https://ankitparekh007.github.io',
  baseUrl: '/Agentic-Engineering-Playbook/',
  organizationName: 'AnkitParekh007',
  projectName: 'Agentic-Engineering-Playbook',
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    announcementBar: {
      id: 'ai-systems-banner',
      content:
        'Build with the live academy: <strong>production-grade agents, copilots, RAG, MCP, evals, observability, and agentic UI</strong>.',
      backgroundColor: '#061223',
      textColor: '#dff7ff',
      isCloseable: false,
    },
    navbar: {
      title: 'Agentic Engineering Playbook',
      logo: {
        alt: 'Agentic Engineering Playbook',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Playbook',
        },
        { to: '/docs/start-here/learning-path', label: 'Roadmap', position: 'left' },
        { to: '/docs/start-here/start-here-contributor-guide', label: 'Contribute', position: 'left' },
        {
          to: '/docs/career-monetization/monetization-roadmap',
          label: 'Business Layer',
          position: 'left',
        },
        {
          href: 'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start',
          items: [
            { label: 'Vision', to: '/docs/start-here/vision' },
            { label: 'Learning Path', to: '/docs/start-here/learning-path' },
            { label: 'Project Ladder', to: '/docs/start-here/project-ladder' },
            { label: 'Contributor Guide', to: '/docs/start-here/start-here-contributor-guide' },
          ],
        },
        {
          title: 'Build',
          items: [
            { label: 'LLM Foundations', to: '/docs/llm-foundations/overview' },
            { label: 'RAG Systems', to: '/docs/rag-systems/overview' },
            { label: 'Agentic UI', to: '/docs/agentic-ui/overview' },
          ],
        },
        {
          title: 'Open Source',
          items: [
            { label: 'Contributing', to: '/docs/open-source/contributing-guide' },
            { label: 'Contribute a Chapter', to: '/docs/open-source/contribute-a-chapter' },
            { label: 'Weekly Challenge', to: '/docs/open-source/weekly-challenge' },
            { label: 'Roadmap', to: '/docs/open-source/open-source-roadmap' },
            {
              label: 'Repository',
              href: 'https://github.com/AnkitParekh007/Agentic-Engineering-Playbook',
            },
          ],
        },
      ],
      copyright: `Copyright (c) ${new Date().getFullYear()} Agentic Engineering Playbook.`,
    },
    prism: {
      additionalLanguages: ['bash', 'typescript', 'python', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
