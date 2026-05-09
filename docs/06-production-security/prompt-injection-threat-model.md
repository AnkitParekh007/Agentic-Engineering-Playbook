# Prompt Injection Threat Model

Prompt injection happens when untrusted content tries to override system instructions.

## Sources of untrusted content

- web pages
- documents
- tickets
- emails
- database records
- user input
- copied logs

## Defense layers

1. Separate trusted and untrusted context
2. Never allow retrieved text to change system instructions
3. Restrict tools by policy
4. Require approval for risky actions
5. Log every tool call
6. Validate structured outputs
7. Run evals against injection examples
