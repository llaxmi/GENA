import { auth, prisma } from "@/lib/auth";
import { generateObject } from "ai";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ollama } from "ollama-ai-provider-v2";
import { z } from "zod";

const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The question text"),
        options: z.array(z.string()).describe("The options for the question"),
        correctIndex: z.number().describe("The index of the correct answer"),
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
- Each question must have exactly 4 multiple choice options
- Include one correct answer and three plausible distractors
- Questions should test understanding, not just memorization
`;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, content, numQuestions, difficulty } = body;
  console.log(name, content, numQuestions, difficulty);
  if (!name || !content || !numQuestions || !difficulty) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: name, content, numQuestions, difficulty",
      },
      { status: 400 }
    );
  }

  const result = await generateObject({
    model: ollama.chat("llama3.1:8b"),
    prompt: quizPrompt(numQuestions, content, difficulty),
    temperature: 0.5,
    schemaName: "quiz",
    schemaDescription: "A quiz with questions and answers",
    schema: quizSchema,
  });
  const questions = result.object.questions.map((question, index) => ({
    question: question.question,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    order: index + 1,
  }));
  const quiz = await prisma.quiz.create({
    data: {
      name: name,
      userId: session.user?.id,
      numberOfQuestions: numQuestions,
      difficultyLevel: difficulty,
      questions: {
        createMany: {
          data: questions,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json(quiz);
}
