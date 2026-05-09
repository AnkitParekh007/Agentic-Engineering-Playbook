import { resourceDefinitionSchema } from './schemas';
import type { ResourceDefinition } from './types';

const resourceRegistry: ResourceDefinition[] = [
  {
    id: 'docs',
    name: 'Internal Docs',
    description: 'Documentation pages used by file search.',
    itemCount: 3,
    items: [
      { id: 'doc-travel-policy', path: '/policies/travel.md', content: 'Travel policy requires receipts above 25 dollars.' },
      { id: 'doc-incident-update', path: '/ops/incidents.md', content: 'Incident updates must be posted every 30 minutes.' },
      { id: 'doc-release-checklist', path: '/eng/releases.md', content: 'Release checklist covers testing, approvals, and rollback readiness.' },
    ],
  },
  {
    id: 'tickets',
    name: 'Jira Tickets',
    description: 'Mock ticket registry for read-only ticket lookups.',
    itemCount: 3,
    items: [
      { key: 'OPS-101', title: 'Improve incident summary template', status: 'open' },
      { key: 'FIN-204', title: 'Review travel receipt exceptions', status: 'in_progress' },
      { key: 'ENG-333', title: 'Audit deployment checklist', status: 'done' },
    ],
  },
  {
    id: 'repos',
    name: 'GitHub Repositories',
    description: 'Mock repository metadata for read-only source lookups.',
    itemCount: 3,
    items: [
      { name: 'agentic-engineering-playbook', language: 'TypeScript', owner: 'AnkitParekh007' },
      { name: 'incident-ops-dashboard', language: 'TypeScript', owner: 'platform-team' },
      { name: 'finance-automation-scripts', language: 'Python', owner: 'ops-team' },
    ],
  },
  {
    id: 'database_tables',
    name: 'Database Tables',
    description: 'Mock read-only database table registry.',
    itemCount: 2,
    items: [
      { table: 'employees', columns: ['id', 'name', 'department'] },
      { table: 'travel_expenses', columns: ['expense_id', 'employee_id', 'amount'] },
    ],
  },
];

export function listResources(): ResourceDefinition[] {
  return resourceRegistry.map((resource) => resourceDefinitionSchema.parse(resource));
}

export function getResource(resourceId: string): ResourceDefinition | undefined {
  const resource = resourceRegistry.find((entry) => entry.id === resourceId);
  return resource ? resourceDefinitionSchema.parse(resource) : undefined;
}
