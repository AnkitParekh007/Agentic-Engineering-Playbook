# Start Here Contributor Guide

If you want to help grow Agentic Engineering Playbook, start here before opening a pull request.

## What this repo is optimizing for

- practical, project-first AI engineering education
- production-shaped examples instead of toy demos
- chapters that stay close to runnable systems
- contributor workflows that are clear enough for first-time open-source contributors

## Best first contributions

- clarify an explanation that is currently too abstract
- improve a diagram or add a missing Mermaid view
- add a stronger project tie-in to an existing chapter
- fix a broken link, stale command, or navigation gap
- improve one starter project README, eval note, or smoke-check explanation

## Read these pages first

- [How to Use This Playbook](./how-to-use-this-playbook.md)
- [Learning Path](./learning-path.md)
- [Contribute a Chapter](../open-source/contribute-a-chapter.md)
- [Project Submission Template](../open-source/project-submission-template.md)

## Choose your contribution lane

### Docs and curriculum

Best for:

- learners
- technical writers
- engineers who want a focused first PR

Examples:

- improve a chapter introduction
- add an enterprise example
- add a practical exercise
- tighten terminology around RAG, MCP, evals, or observability

### Diagrams and visual explanation

Best for:

- developers who think in systems
- contributors comfortable with Mermaid or architecture sketches

Examples:

- add a missing sequence diagram
- improve a project architecture map
- turn a dense paragraph into a visual explanation

### Starter projects and checks

Best for:

- engineers who want to touch code
- contributors comfortable with TypeScript, Node.js, Angular, or local validation

Examples:

- improve smoke checks
- fix a type error
- add a safer configuration pattern
- improve README guidance for one project

## Local workflow

```bash
npm install
npm run build
```

Project checks are listed in the repository README on GitHub:

- [Repository README](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/blob/main/README.md)

Run only the checks relevant to the area you changed unless your PR affects multiple projects.

## What good contributions look like

- focused scope
- practical learner benefit
- explicit commands and file references
- no fake claims about usage, students, traction, or results
- no unnecessary complexity added to beginner-facing material

## Before opening a PR

1. Make sure the change improves a real learner or contributor experience.
2. Check whether a new page needs to be added to `sidebars.ts`.
3. Run `npm run build` from the repo root.
4. Run related project checks where your change touches starter code or project docs.
5. Explain the learner or community impact in the PR description.
