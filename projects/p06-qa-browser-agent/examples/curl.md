# cURL Examples

## Health check

```bash
curl http://localhost:4006/health
```

## Playground dry run

```bash
curl -X POST http://localhost:4006/test-runs \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "homepage_smoke",
    "environment": "playground",
    "targetUrl": "mock://homepage",
    "dryRun": true
  }'
```

## Safe local browser run

```bash
curl -X POST http://localhost:4006/test-runs \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "navigation_check",
    "environment": "test",
    "targetUrl": "mock://navigation"
  }'
```

## Fetch run status

```bash
curl http://localhost:4006/test-runs/<run-id>
```

## Fetch run report

```bash
curl http://localhost:4006/test-runs/<run-id>/report
```

## Destructive request blocked

```bash
curl -X POST http://localhost:4006/test-runs \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "navigation_check",
    "environment": "prod",
    "targetUrl": "mock://navigation",
    "actionIntent": "mutate"
  }'
```

## Invalid external URL rejected

```bash
curl -X POST http://localhost:4006/test-runs \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "login_form_visual_check",
    "environment": "test",
    "targetUrl": "https://not-allowed.example.com/login"
  }'
```
