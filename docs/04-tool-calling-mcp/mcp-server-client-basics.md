# MCP Server and Client Basics

MCP standardizes how AI applications connect to tools, data, and context.

## MCP building blocks

- server
- client
- tools
- resources
- prompts
- transport

## Example MCP server idea

Build a read-only Jira MCP server:

- search issues
- read issue details
- list project bugs
- summarize open defects

## Safety baseline

Start with read-only tools before write tools.

## Practice

Create one MCP server with two tools:

1. `searchDocs(query)`
2. `readDoc(id)`
