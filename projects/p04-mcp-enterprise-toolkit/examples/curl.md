# cURL examples

## Health

```bash
curl http://localhost:4004/health
```

## List tools

```bash
curl http://localhost:4004/tools
```

## Invoke file search

```bash
curl -X POST http://localhost:4004/tools/file_search/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "read",
    "input": {
      "query": "travel policy"
    }
  }'
```

## Invoke Jira mock

```bash
curl -X POST http://localhost:4004/tools/jira_readonly_mock/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "read",
    "input": {
      "query": "incident",
      "status": "open"
    }
  }'
```

## Blocked write operation

```bash
curl -X POST http://localhost:4004/tools/file_search/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "write",
    "input": {
      "query": "travel policy"
    }
  }'
```

## Unknown tool

```bash
curl -X POST http://localhost:4004/tools/unknown_tool/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "read",
    "input": {
      "query": "anything"
    }
  }'
```

## List resources

```bash
curl http://localhost:4004/resources
```

## Get one resource

```bash
curl http://localhost:4004/resources/docs
```
