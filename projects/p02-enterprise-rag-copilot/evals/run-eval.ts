import fs from 'node:fs/promises';
import path from 'node:path';
import { buildCitedAnswer } from '../src/answering';
import { chunkDocument } from '../src/chunking';
import { config } from '../src/config';
import { rankChunks } from '../src/retrieval';
import { readDocuments } from '../src/storage';

type EvalQuestion = {
  id: string;
  query: string;
  expectedDocumentId: string;
  expectedKeywords: string[];
};

async function loadQuestions(): Promise<EvalQuestion[]> {
  const filePath = path.resolve(process.cwd(), 'evals', 'questions.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as EvalQuestion[];
}

async function run(): Promise<void> {
  const [documents, questions] = await Promise.all([readDocuments(), loadQuestions()]);
  const chunks = documents.flatMap((document) =>
    chunkDocument(document, config.chunkSize, config.chunkOverlap),
  );

  let passed = 0;

  for (const question of questions) {
    const results = rankChunks(question.query, chunks, 3);
    const answer = buildCitedAnswer(question.query, results);
    const topResult = results[0];
    const topDocumentMatch = topResult?.chunk.documentId === question.expectedDocumentId;
    const answerText = answer.answer.toLowerCase();
    const keywordMatch = question.expectedKeywords.some((keyword) =>
      answerText.includes(keyword.toLowerCase()),
    );
    const success = Boolean(topDocumentMatch && keywordMatch && answer.grounded);

    if (success) {
      passed += 1;
    }

    console.log(
      JSON.stringify({
        id: question.id,
        success,
        topDocumentId: topResult?.chunk.documentId ?? null,
        expectedDocumentId: question.expectedDocumentId,
        grounded: answer.grounded,
        confidence: answer.confidence,
      }),
    );
  }

  console.log(
    JSON.stringify({
      event: 'rag_eval_summary',
      passed,
      total: questions.length,
      failed: questions.length - passed,
    }),
  );

  if (passed !== questions.length) {
    throw new Error(`Evaluation failed: passed ${passed} of ${questions.length} questions.`);
  }
}

void run();
