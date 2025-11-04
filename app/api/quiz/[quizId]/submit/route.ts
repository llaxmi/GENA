import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const answerSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedIndex: z.number().int().min(0),
    })
  ),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const body = await request.json();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parseResult = answerSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const { answers } = parseResult.data;

  const questions = await prisma.question.findMany({
    where: { quizId },
    select: { id: true, correctIndex: true, order: true },
  });

  if (!questions.length) {
    return NextResponse.json(
      { error: "No questions found for this quiz" },
      { status: 400 }
    );
  }

  let totalCorrect = 0;
  const answerRecords = answers.map((ans) => {
    const question = questions.find((q) => q.id === ans.questionId);
    const isCorrect = question && ans.selectedIndex === question.correctIndex;
    if (isCorrect) totalCorrect++;

    return {
      questionId: ans.questionId,
      selectedIndex: ans.selectedIndex,
      isCorrect: isCorrect ?? false,
      correctIndex: question?.correctIndex ?? 0,
      order: question?.order ?? 0,
    };
  });

  const dbAnswerRecords = answers.map((ans) => {
    const question = questions.find((q) => q.id === ans.questionId);
    const isCorrect = question && ans.selectedIndex === question.correctIndex;

    return {
      quizId,
      questionId: ans.questionId,
      selectedIndex: ans.selectedIndex,
      isCorrect: isCorrect ?? false,
    };
  });

  await prisma.$transaction([
    prisma.quizAnswer.deleteMany({ where: { quizId } }),
    prisma.quizAnswer.createMany({
      data: dbAnswerRecords,
    }),
    prisma.quiz.update({
      where: { id: quizId },
      data: {
        score: totalCorrect,
        totalCorrectAnswers: totalCorrect,
        totalIncorrectAnswers: questions.length - totalCorrect,
      },
    }),
  ]);

  return NextResponse.json({
    quizId,
    totalQuestions: questions.length,
    totalCorrect,
    totalIncorrect: questions.length - totalCorrect,
    answers: answerRecords,
  });
}
