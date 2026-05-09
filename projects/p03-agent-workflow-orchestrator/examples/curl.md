# cURL examples

## Health

```bash
curl http://localhost:4003/health
```

## Safe run

```bash
curl -X POST http://localhost:4003/runs \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Summarize the incident update process for me"
  }'
```

## Risky run that pauses for approval

```bash
curl -X POST http://localhost:4003/runs \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Create a follow-up task for finance to audit travel receipts"
  }'
```

## Fetch run details

```bash
curl http://localhost:4003/runs/<runId>
```

## Approve a waiting run

```bash
curl -X POST http://localhost:4003/runs/<runId>/approve \
  -H "Content-Type: application/json" \
  -d '{
    "approved": true
  }'
```
