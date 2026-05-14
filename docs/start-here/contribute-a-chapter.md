---
sidebar_position: 3
title: "Contribute a Chapter"
description: "How to propose, write, and ship a new curriculum chapter."
---

# Contribute a Chapter

The playbook grows through community contributions. This guide walks through writing a full chapter from proposal to merge.

## What a chapter is

A chapter is one `.md` file inside a layer folder (`docs/llm-foundations/`, `docs/rag-systems/`, etc.) that follows the standard structure. It should be something a working engineer can read in 15–20 minutes and immediately apply.

## Step 1: Open a proposal issue

Before writing, open a [New Chapter Proposal](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/issues/new?template=new_chapter_proposal.md) issue. Include:

- the proposed title and layer it belongs to
- what problem it solves for learners
- a rough outline (bullet points are fine)
- any existing content you will reference or replace

This prevents duplicate effort and lets maintainers give feedback before you invest time writing.

## Step 2: Get acknowledgment

A maintainer will comment on your proposal within a few days. Once acknowledged, you are clear to write.

## Step 3: Write the chapter

Use the standard chapter structure:

```markdown
---
sidebar_position: N
title: "Chapter Title"
description: "One-line description for SEO and sidebar tooltips."
---

# Chapter Title

## The beginner view

Plain English explanation. What is this, why does it exist?

## The production view

How do teams actually implement this at scale? What changes?

## Enterprise example

Concrete scenario: a team, a constraint, a decision, and the outcome.

## How it works

Mermaid diagram (required for architecture topics).

## Practical exercise

A specific, completable task the reader can do right now.

## Project tie-in

Which project in this playbook demonstrates this? Link to it.

## Further reading

2–4 external links. Official docs, papers, or credible blog posts only.
```

## Step 4: Run the build

```bash
npm run build
```

Fix any broken links, MDX errors, or sidebar mismatches before opening the PR.

## Step 5: Add to the sidebar

Open `sidebars.ts` and insert your new doc in the correct position. Follow existing naming conventions (folder/filename, no `.md` extension).

## Step 6: Open the PR

- branch name: `chapter/layer-short-title` (e.g., `chapter/rag-metadata-filtering`)
- PR title: `[Chapter] Layer N: Chapter Title`
- describe learner impact in the PR body

## Chapter quality checklist

- [ ] beginner explanation present
- [ ] production explanation present
- [ ] enterprise example present
- [ ] at least one Mermaid diagram for architecture topics
- [ ] practical exercise with a clear success criterion
- [ ] project tie-in linked
- [ ] `npm run build` passes locally
- [ ] sidebar updated

## Not sure where a topic fits?

Post in [Discussions](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/discussions). Someone will help you find the right layer.
