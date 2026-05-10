import DocBadge from '@site/src/components/DocBadge';
import CommandCard from '@site/src/components/CommandCard';
import ProjectStatusCard from '@site/src/components/ProjectStatusCard';

# Docs Component Guide

Use these components and block styles to keep the playbook visually consistent across concept pages and project docs.

## Inline badges

Use `DocBadge` when a section needs a compact AI-specific label.

```mdx
import DocBadge from '@site/src/components/DocBadge';

<DocBadge tone="concept">Concept</DocBadge>
<DocBadge tone="production">Production pattern</DocBadge>
<DocBadge tone="build">Build step</DocBadge>
<DocBadge tone="eval">Eval</DocBadge>
<DocBadge tone="security">Security note</DocBadge>
<DocBadge tone="portfolio">Portfolio signal</DocBadge>
```

Example:

<DocBadge tone="concept">Concept</DocBadge>{' '}
<DocBadge tone="production">Production pattern</DocBadge>{' '}
<DocBadge tone="build">Build step</DocBadge>{' '}
<DocBadge tone="eval">Eval</DocBadge>{' '}
<DocBadge tone="security">Security note</DocBadge>{' '}
<DocBadge tone="portfolio">Portfolio signal</DocBadge>

## Structured content blocks

Use the shared `doc-block` classes for rich callouts inside chapters.

```mdx
<div className="doc-block doc-block--concept">
  <DocBadge tone="concept">Concept</DocBadge>
  <p>Explain the core idea in plain language.</p>
</div>
```

Available block variants:

- `doc-block--concept`
- `doc-block--production`
- `doc-block--build`
- `doc-block--eval`
- `doc-block--security`
- `doc-block--portfolio`

Example:

<div className="doc-block doc-block--security">
  <DocBadge tone="security">Security note</DocBadge>
  <p>Approval flows, tool permissions, and prompt injection boundaries should be visible in the docs, not hidden in prose.</p>
</div>

## Project implementation cards

Use `ProjectStatusCard` near the top of a project page.

```mdx
import ProjectStatusCard from '@site/src/components/ProjectStatusCard';

<ProjectStatusCard
  status="Runnable"
  folderHref="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p01-ai-provider-gateway"
  stack={['TypeScript', 'Express', 'Zod']}
  proves="One normalized API surface can support streaming, schemas, and trace logging."
  nextUpgrade="Replace the placeholder provider with a real model client and add fallback routing."
/>
```

Example:

<ProjectStatusCard
  status="Runnable"
  folderHref="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p01-ai-provider-gateway"
  stack={['TypeScript', 'Express', 'Zod']}
  proves="One normalized API surface can support streaming, schemas, and trace logging."
  nextUpgrade="Replace the placeholder provider with a real model client and add fallback routing."
/>

## Command blocks

Use `CommandCard` for commands instead of long raw fences when the commands are important to the build flow.

```mdx
import CommandCard from '@site/src/components/CommandCard';

<CommandCard
  title="Core commands"
  commands={[
    'npm install',
    'npm run build',
    'npm run smoke',
  ]}
/>
```

Example:

<CommandCard
  title="Core commands"
  commands={[
    'npm install',
    'npm run build',
    'npm run smoke',
  ]}
/>

## Usage guidance

- Use `DocBadge` and `doc-block` together for concept-heavy sections.
- Use `ProjectStatusCard` once near the top of a project page.
- Use `CommandCard` when commands are central to the learner workflow.
- Keep callouts practical. If a block does not help the learner build, cut it.
