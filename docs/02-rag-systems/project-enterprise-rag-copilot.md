# Project: Enterprise RAG Copilot

## Goal

Build a RAG copilot that can answer questions from uploaded documentation.

## Features

- upload documents
- ingest documents
- create chunks
- generate embeddings
- store vectors
- search semantically
- rerank results
- answer with citations
- show retrieved context
- collect feedback

## Architecture

```mermaid
flowchart TD
  Admin[Admin Upload] --> IngestionAPI
  IngestionAPI --> Parser
  Parser --> Chunker
  Chunker --> EmbeddingService
  EmbeddingService --> VectorDB
  User --> ChatAPI
  ChatAPI --> Retriever
  Retriever --> VectorDB
  Retriever --> Reranker
  Reranker --> AnswerGenerator
  AnswerGenerator --> User
```

## Portfolio output

Create a demo where users upload docs and ask questions with citations.
