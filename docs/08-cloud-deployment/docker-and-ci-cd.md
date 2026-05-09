# Docker and CI/CD

## Docker targets

- frontend docs site
- Angular app
- NestJS API
- vector database
- Postgres

## CI steps

```mermaid
flowchart TD
  Push --> Install
  Install --> Lint
  Lint --> Test
  Test --> Build
  Build --> DockerImage
  DockerImage --> Deploy
```
