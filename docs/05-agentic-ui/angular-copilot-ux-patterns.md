# Angular Copilot UX Patterns

## Layout

```mermaid
flowchart LR
  Sidebar[Sessions Sidebar] --> Chat[Chat + Agent Panel]
  Chat --> Browser[Browser/Test Panel]
```

## Required components

- `CopilotShellComponent`
- `SessionSidebarComponent`
- `ChatThreadComponent`
- `ToolTimelineComponent`
- `ApprovalCardComponent`
- `BrowserPanelComponent`
- `ModelSelectorComponent`
- `ModeSelectorComponent`

## Modes

| Mode | Behavior |
|---|---|
| Ask | answer only |
| Plan | create plan, no execution |
| Agent | plan and execute with approvals |
