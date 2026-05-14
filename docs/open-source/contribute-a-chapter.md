# Contribute a Chapter

Use this guide when proposing a new chapter or making a major improvement to an existing one.

## What makes a strong chapter

A strong chapter is:

- practical
- tied to a real project or system boundary
- useful to both learners and working engineers
- clear about what is beginner-friendly versus production-grade

## Preferred chapter structure

Most substantial chapters should include:

1. What the concept is
2. Why it matters in production
3. One practical architecture or workflow
4. One Mermaid diagram
5. One project tie-in
6. One exercise or implementation prompt

## Best chapter topics

- production-grade prompt contracts
- multi-agent orchestration tradeoffs
- citations and retrieval quality evaluation
- MCP permissions and audit boundaries
- operator-facing AI UI patterns
- observability for traces, cost, and quality

## What to avoid

- generic "AI 101" explanations with no implementation angle
- inflated claims about business impact or adoption
- framework sprawl without a clear reason
- pages that describe a pattern but never show where it fits in the repo

## Fast contribution process

1. Open a `New chapter proposal` issue.
2. Explain the learner value and target layer.
3. Draft the page using [Chapter Template](../start-here/chapter-template.md).
4. Add the page to `sidebars.ts`.
5. Run `npm run build`.
6. Link the chapter to a relevant project whenever possible.

## Good chapter ideas

- evaluation scorecards for agent systems
- trace review workflow for operators
- real MCP transport follow-up to Project 04
- browser agent safety patterns beyond dry-run mode
- Angular AI state management patterns
