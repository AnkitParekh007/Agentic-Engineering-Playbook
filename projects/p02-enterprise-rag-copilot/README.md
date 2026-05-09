# Project 02: Enterprise RAG Copilot

This starter gives you a local, beginner-friendly RAG service with document storage, chunking, hybrid retrieval, and cited answer generation. It is intentionally small, but the structure matches the first version of an internal knowledge copilot.

The default experience does not require paid APIs. Retrieval uses local file storage plus deterministic keyword and semantic-like scoring so you can learn the full flow before adding real embeddings or a vector database.

The current answer builder is extractive and mock-first. It assembles grounded answers directly from retrieved chunks. A later iteration can connect answer generation to Project 01: AI Provider Gateway once you are ready to add a real generation layer.

## What this project teaches

- how document ingestion and chunking work in a practical RAG pipeline
- how to store document and chunk metadata for inspection
- how keyword and semantic-like retrieval can be combined into hybrid scoring
- how to return cited answers instead of unsupported free-form output
- how to log retrieval traces with chunk count, latency, and confidence

## Architecture

The service has five main layers:

1. `src/app.ts`
   Defines the HTTP API and request handling flow.
2. `src/storage.ts`
   Reads and writes `data/documents.json` and `data/chunks.json`.
3. `src/chunking.ts`
   Splits documents into reusable chunks with metadata.
4. `src/retrieval.ts`
   Runs keyword, semantic-like, hybrid, and top-k retrieval logic.
5. `src/answering.ts`
   Builds an extractive cited answer from the retrieved evidence.

See [architecture.md](./architecture.md) for the system diagram.

## Project structure

```text
projects/p02-enterprise-rag-copilot/
|-- data/
|   |-- chunks.json
|   `-- documents.json
|-- examples/
|   `-- curl.md
|-- src/
|   |-- answering.ts
|   |-- app.ts
|   |-- chunking.ts
|   |-- config.ts
|   |-- retrieval.ts
|   |-- schemas.ts
|   |-- server.ts
|   |-- smoke.ts
|   |-- storage.ts
|   |-- tracing.ts
|   `-- types.ts
|-- .env.example
|-- architecture.md
|-- package-lock.json
|-- package.json
`-- tsconfig.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. Start the dev server

```bash
npm run dev
```

The server starts on `http://localhost:4002` by default.

## Environment variables

```env
PORT=4002
CHUNK_SIZE=80
CHUNK_OVERLAP=20
DEFAULT_TOP_K=4
```

- `PORT` controls the server port.
- `CHUNK_SIZE` is the target chunk size in words.
- `CHUNK_OVERLAP` keeps some context between adjacent chunks.
- `DEFAULT_TOP_K` controls default retrieval depth.

## API surface

### `GET /health`

Returns service status plus the current document and chunk counts.

### `POST /documents`

Stores one or more raw documents in `data/documents.json`.

### `POST /ingest`

Reads stored documents, chunks them, and writes chunk records into `data/chunks.json`.

### `POST /search`

Runs hybrid retrieval over chunks and returns scored evidence.

### `POST /ask`

Retrieves top chunks and returns a cited answer based only on those chunks.

Today that answer is extractive and grounded in retrieved text. Later you can swap this layer to call Project 01: AI Provider Gateway for full answer generation while keeping the same retrieval contract.

## Sample documents

The starter ships with sample knowledge documents in `data/documents.json`:

- an internal travel policy
- an incident response handbook

Run `POST /ingest` first so those documents become searchable chunks.

## Example flow

1. Check health.
2. Ingest the sample documents.
3. Search for a question like `What is the incident severity paging rule?`
4. Ask the same question through `/ask`.
5. Inspect the returned citations.

See [examples/curl.md](./examples/curl.md) for copy-paste requests.

## Example answer shape

```json
{
  "requestId": "8e69b765-f2d8-4ac0-9c8a-2d30dc324f09",
  "answer": {
    "answer": "The incident handbook says Sev-1 incidents require paging the on-call engineer and incident commander immediately.",
    "confidence": 0.78,
    "citations": [
      {
        "chunkId": "doc_incident_guide_chunk_1",
        "documentId": "doc_incident_guide",
        "title": "Incident Response Handbook"
      }
    ],
    "grounded": true
  },
  "retrievedChunkCount": 4,
  "latencyMs": 31
}
```

## Common RAG mistakes

- chunking documents without storing traceable metadata
- retrieving text but not returning citations to the caller
- relying only on naive keyword search for language-varied queries
- forcing an answer even when evidence is weak
- making the retrieval layer impossible to inspect or debug

## Smoke check

```bash
npm run smoke
```

This verifies that configuration, storage, retrieval, and the Express app can be imported without starting the server.

## Minimal eval dataset

```bash
npm run eval
```

The starter includes `evals/questions.json` with five retrieval checks. The eval chunks the sample documents in memory, runs retrieval, builds a cited answer, and prints a pass/fail summary. This keeps the first evaluation loop simple enough for beginners while still teaching the habit of measuring retrieval quality.

## How this connects to Layer 2

This project is the implementation companion for Layer 2: RAG Systems.

It maps directly to the core topics:

- chunking
- metadata storage
- retrieval quality
- hybrid search
- citations
- grounded answer generation

The docs explain the design concepts. This folder turns them into a runnable starter that you can extend with real embeddings, rerankers, and a vector store later.
