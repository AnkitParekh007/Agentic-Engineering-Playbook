---
sidebar_position: 2
title: "Start Here: Contributors"
description: "Your first 30 minutes as a contributor — find an issue, make a fix, ship a PR."
---

# Start Here: Contributors

Welcome. This guide gets you from zero to first pull request in 30 minutes.

## Who this is for

- developers who want to contribute curriculum improvements
- engineers who found a bug in a project or doc
- learners who want to add an example, diagram, or exercise
- anyone who wants open-source credit on a production-grade AI repo

## Step 1: Fork and clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/YOUR_USERNAME/Agentic-Engineering-Playbook.git
cd Agentic-Engineering-Playbook
npm install
npm run start
```

The local dev server opens at `http://localhost:3000`. Changes to docs hot-reload instantly.

## Step 2: Pick your first contribution

| Type | Where to look | Effort |
|---|---|---|
| Fix a typo or broken link | Any `.md` file | 5 min |
| Add a code example | Any chapter | 20–60 min |
| Add or improve a Mermaid diagram | Any chapter | 30–60 min |
| Add an exercise or interview question | Any chapter | 30–60 min |
| Fix a project build issue | `projects/p0*` | 30–120 min |
| Write a new chapter section | See [Contribute a Chapter](./contribute-a-chapter) | Half day |

Browse [good first issues](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/labels/good%20first%20issue) on GitHub for specific tasks that are ready to pick up.

## Step 3: Make your changes

All curriculum lives in `docs/`. Projects live in `projects/`. The site is Docusaurus — standard Markdown plus MDX.

```bash
# Work on a dedicated branch
git checkout -b fix/my-improvement
# Edit files, then verify the build
npm run build
```

The build must pass before you open a PR. It checks for broken links, sidebar mismatches, and MDX errors.

## Step 4: Open a pull request

- Target the `main` branch
- Use the PR template (it auto-loads)
- Describe what changed and why
- Include a screenshot if you changed a page layout

## Standards

- keep content practical and project-connected
- prefer concrete workflows over abstract theory
- TypeScript examples by default; Python where it fits evals or data work
- every diagram should have a text description below it for accessibility

## Questions?

Open a [GitHub Discussion](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/discussions) — the community and maintainers watch it.
