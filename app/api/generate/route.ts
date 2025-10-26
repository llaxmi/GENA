import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { ollama } from "ollama-ai-provider-v2";
import { z } from "zod";

const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The question text"),
        options: z.object({
          A: z.string().describe("Option A"),
          B: z.string().describe("Option B"),
          C: z.string().describe("Option C"),
          D: z.string().describe("Option D"),
        }),
        correctAnswer: z.string().describe("The correct answer"),
        explanation: z
          .string()
          .describe("The explanation for the correct answer"),
      })
    )
    .describe("The quiz questions"),
});

const quizPrompt = (
  numQuestions: number,
  content: string,
  difficulty: string
) => `
You are an expert quiz generator. Generate ${numQuestions} quiz questions based on the following content.

Content: "${content}"

Requirements:
- Generate exactly ${numQuestions} questions
- Difficulty level: ${difficulty}
- Each question must have exactly 4 multiple choice options (A, B, C, D)
- Include one correct answer and three plausible distractors
- Questions should test understanding, not just memorization
`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { content, numQuestions, difficulty } = body;

  if (!content || !numQuestions || !difficulty) {
    return NextResponse.json(
      { error: "Missing required fields: content, numQuestions, difficulty" },
      { status: 400 }
    );
  }

  const result = await generateObject({
    model: ollama.chat("llama3.1:8b"),
    prompt: quizPrompt(numQuestions, content, difficulty),
    temperature: 0.5,
    schemaName: "quiz",
    schemaDescription: "A quiz with questions and answers",
    schema: quizSchema as any,
  });

  return NextResponse.json(result.object);
}
