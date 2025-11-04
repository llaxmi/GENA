import { QuizSection } from "@/features/quizset/quiz-section";
import { prisma } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
  });

  if (!quiz) {
    return notFound();
  }

  const questions = await prisma.question.findMany({
    where: {
      quizId: quizId,
    },
    orderBy: {
      order: "asc",
    },
  });
  return <QuizSection questions={questions} quizId={quizId} quiz={quiz} />;
}
