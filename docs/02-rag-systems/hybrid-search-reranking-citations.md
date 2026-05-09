# Hybrid Search, Reranking, and Citations

## Hybrid search

Hybrid search combines:

- vector similarity
- keyword/BM25 search
- metadata filters

## Reranking

Reranking reviews the retrieved chunks and sorts them by true usefulness.

## Citations

Every grounded answer should include source references.

## Anti-hallucination rule

If retrieval confidence is low, the answer should say:

> I could not find enough reliable information in the available sources.

## Evaluation questions

- Did the answer use retrieved context?
- Did it cite the right source?
- Did it refuse when context was weak?
- Did it avoid unsupported claims?
