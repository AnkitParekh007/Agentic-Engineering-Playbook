# Enterprise Readiness Checklist

## Beginner explanation

Enterprise readiness means the system is understandable, governable, supportable, and safe enough to operate beyond a demo.

## Production explanation

This checklist is useful because most AI failures in organizations are not model failures alone. They are failures of deployment discipline, permissions, observability, support workflows, or procurement confidence.

## Real-world enterprise example

A team preparing a document copilot for a pilot review uses the checklist to prove grounding behavior, audit logging, permission boundaries, and fallback paths.

## Checklist

### Product

- clear user roles and allowed actions
- defined failure and fallback behavior
- evidence or citation visibility where needed

### Security

- tool risk classification
- approval paths for write actions
- prompt injection mitigations
- secret handling and tenant isolation

### Reliability

- offline eval cases
- latency and cost monitoring
- retry strategy and timeout policy

### Operations

- trace logging for each run
- staging environment
- deployment checklist and rollback plan

## Mini exercise

Score one project red, yellow, or green against each checklist area and identify the two biggest gaps.

## Project assignment

Use this checklist to prioritize the final hardening backlog for any project in the playbook.

## Interview questions

- What makes an AI system enterprise-ready beyond model quality?
- Which readiness gaps are most likely to block a pilot?
- How would you show a stakeholder that your system is governable?

## Monetization angle

Readiness reviews can become architecture audits, pilot-readiness packages, or premium implementation offerings.
