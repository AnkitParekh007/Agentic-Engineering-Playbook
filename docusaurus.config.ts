import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'Agentic Engineering Playbook',
	tagline: 'Master AI agents by building real production-grade applications.',
	favicon: 'img/favicon.ico',
	url: 'https://your-github-username.github.io',
	baseUrl: '/agentic-engineering-playbook/',
	organizationName: 'your-github-username',
	projectName: 'agentic-engineering-playbook',
	onBrokenLinks: 'throw',
	markdown: {
		hooks: {
		  onBrokenMarkdownLinks: 'warn',
		},
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					editUrl: 'https://github.com/your-github-username/agentic-engineering-playbook/tree/main/'
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css'
				}
			} satisfies Preset.Options
		]
	],
	themeConfig: {
		image: 'img/social-card.png',
		navbar: {
			title: 'Agentic Engineering Playbook',
			items: [
				{ type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
				{ to: '/docs/09-career-monetization/monetization-roadmap', label: 'Monetize', position: 'left' },
				{ href: 'https://github.com/your-github-username/agentic-engineering-playbook', label: 'GitHub', position: 'right' }
			]
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Learn',
					items: [
						{ label: 'Start Here', to: '/docs/00-start-here/vision' },
						{ label: 'Projects', to: '/docs/00-start-here/project-ladder' }
					]
				},
				{
					title: 'Community',
					items: [
						{ label: 'GitHub', href: 'https://github.com/your-github-username/agentic-engineering-playbook' },
						{ label: 'Discussions', href: 'https://github.com/your-github-username/agentic-engineering-playbook/discussions' }
					]
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} Agentic Engineering Playbook.`
		},
		prism: {
			additionalLanguages: ['bash', 'typescript', 'python', 'json']
		}
	} satisfies Preset.ThemeConfig
};

export default config;
