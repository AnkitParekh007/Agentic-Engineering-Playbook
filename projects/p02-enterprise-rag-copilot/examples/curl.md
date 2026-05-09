# cURL examples

## Health

```bash
curl http://localhost:4002/health
```

## Add documents

```bash
curl -X POST http://localhost:4002/documents \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "title": "Benefits FAQ",
        "content": "Employees can enroll in benefits during onboarding or the annual open enrollment window.",
        "source": "hr-handbook",
        "tags": ["hr", "benefits"]
      }
    ]
  }'
```

## Ingest documents

```bash
curl -X POST http://localhost:4002/ingest \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Search

```bash
curl -X POST http://localhost:4002/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do we page the incident commander for a Sev-1?",
    "topK": 3
  }'
```

## Ask

```bash
curl -X POST http://localhost:4002/ask \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the travel meal policy for domestic trips?",
    "topK": 4
  }'
```
