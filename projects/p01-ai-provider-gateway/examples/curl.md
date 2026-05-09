# cURL examples

## Health

```bash
curl http://localhost:4001/health
```

## Chat

```bash
curl -X POST http://localhost:4001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "system", "content": "You are a concise platform assistant." },
      { "role": "user", "content": "What is an AI provider gateway?" }
    ]
  }'
```

## Streamed chat

```bash
curl -N -X POST http://localhost:4001/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Stream a short explanation of structured output validation." }
    ]
  }'
```

## Structured output

```bash
curl -X POST http://localhost:4001/structured-output \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Summarize why trace logging matters." }
    ]
  }'
```
