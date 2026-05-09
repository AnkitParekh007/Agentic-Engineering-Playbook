# Project 05 Architecture

This starter keeps the UI front-end only. The purpose is to teach agentic copilot UX before adding backend dependencies.

## Shell layout

```mermaid
flowchart LR
  Sidebar["Session Sidebar"] --> Main["Chat Area"]
  Main --> Composer["Bottom Composer"]
  Main --> Activity["Tool and Activity Panel"]
```

## Front-end data flow

```mermaid
flowchart TD
  User["User Input"] --> App["App Component"]
  App --> State["Copilot State Service"]
  App --> MockApi["Mock Agent API Service"]
  MockApi --> Stream["Streaming Events"]
  MockApi --> Timeline["Activity Events"]
  MockApi --> Approval["Approval Event"]
  Stream --> State
  Timeline --> State
  Approval --> State
  State --> Sidebar["Session Sidebar"]
  State --> Chat["Chat Thread"]
  State --> Panel["Activity Panel"]
```

## Design notes

- the shell is intentionally similar to modern AI coding and chat products
- state is local and inspectable instead of hidden inside a complex store
- approvals are first-class UI objects, not side effects
- model and environment selectors are visible because operators need context
- future versions can replace the mock API with Project 01 through 04 integrations
