import { auth, prisma } from "@/lib/auth";
import quizGenerator from "@/lib/generate";
import { quizSchema } from "@/schema/quiz.schema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
  const body = await request.formData();

  const type = body.get("type");
  const name = body.get("name");
  const content = body.get("content");
  const numQuestions = body.get("numQuestions");
  const difficulty = body.get("difficulty");
  const file = body.get("file");

  console.log(content);

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const parseResult = quizSchema.safeParse({
    type,
    name,
    numQuestions,
    difficulty,
    content,
    file,
  });

  if (!parseResult.success) {
    console.log(parseResult.error.flatten());
    return NextResponse.json(
      { error: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const result = await quizGenerator.generateQuiz(parseResult.data);
  const questions = result.map((question, index) => ({
    question: question.question,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    order: index + 1,
  }));
  const quiz = await prisma.quiz.create({
    data: {
      name: parseResult.data.name || "Untitled Quiz",
      userId: session.user?.id,
      numberOfQuestions: parseResult.data.numQuestions,
      difficultyLevel: parseResult.data.difficulty,
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
