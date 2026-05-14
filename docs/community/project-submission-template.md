---
sidebar_position: 2
title: "Project Submission Template"
description: "How to submit a new project to the playbook — structure, standards, and checklist."
---

# Project Submission Template

Use this guide when you want to contribute a new runnable project to the playbook. All projects in `projects/` must meet this standard before they are merged.

## What a project is

A project is a self-contained, runnable AI system under `projects/p0N-project-name/`. It teaches one or more layers of the curriculum through code a learner can run locally, read completely, and extend.

## Project folder structure

```
projects/pNN-your-project-name/
├── README.md          # Required. Learner-facing brief (see template below)
├── architecture.md    # Required. System diagram + decision rationale
├── package.json       # Required. Must include: typecheck, build, smoke scripts
├── tsconfig.json      # Required for TypeScript projects
├── src/               # Required. Source code
├── examples/          # Required. At least one runnable example
└── evals/             # Recommended. At least one eval for output quality
```

## README.md template

Copy this for your project's README:

```markdown
# Project NN: [Project Name]

## What this builds

One paragraph. What is the system, what does it do, why does it matter?

## What you will learn

- skill 1
- skill 2
- skill 3

## Prerequisites

- Node 20+ (or Python 3.11+ if applicable)
- [List API keys or services required]

## Quick start

\`\`\`bash
npm install
npm run smoke
\`\`\`

## Architecture

See [architecture.md](./architecture.md).

## Examples

\`\`\`bash
npm run example:basic
npm run example:advanced
\`\`\`

## Evals

\`\`\`bash
npm run eval
\`\`\`

## Extension ideas

- idea 1
- idea 2

## Related playbook chapters

- [Link to relevant chapter]
```

## architecture.md template

```markdown
# Architecture: [Project Name]

## System diagram

\`\`\`mermaid
graph TD
  A[Input] --> B[Processing]
  B --> C[Output]
\`\`\`

## Components

| Component | Purpose | Technology |
|---|---|---|
| Component A | ... | ... |

## Key decisions

### Decision 1: [Decision title]

**Option considered:** ...  
**Chosen approach:** ...  
**Reason:** ...

## Failure modes and mitigations

| Failure | Mitigation |
|---|---|
| ... | ... |
```

## package.json scripts (required)

Every project must expose these scripts:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "smoke": "node dist/examples/smoke.js",
    "eval": "node dist/evals/run.js"
  }
}
```

`smoke` must run without network calls, API keys, or browser installs. It validates that the code compiles and the core logic executes. `eval` may require API keys but must exit cleanly with a pass/fail summary.

## Pre-submission checklist

- [ ] Folder follows `pNN-kebab-name` naming convention
- [ ] `README.md` uses the template above
- [ ] `architecture.md` includes a Mermaid diagram
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] `npm run smoke` passes without API keys or external services
- [ ] At least one file in `examples/`
- [ ] No secrets, tokens, or personal data committed
- [ ] `.env.example` provided if the project requires environment variables
- [ ] Project referenced in the relevant curriculum chapter
- [ ] CI workflow updated to include the new project (copy an existing job in `.github/workflows/ci.yml`)

## Submitting

1. Open a [feature request issue](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/issues/new?template=feature_request.md) first to describe the project and confirm it fits the curriculum
2. Build it in your fork following this template
3. Open a PR with the title `[Project] PN: Project Name`
4. Include in the PR description: what learners will build, what layer it covers, and smoke test output

Projects that cannot be run locally will not be merged.
