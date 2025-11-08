import QuizResult from "@/features/quizset/quiz-result";
import { prisma } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
  });

  if (!quiz) {
    return notFound();
  }

  if (quiz.status !== "COMPLETED") {
    return redirect(`/quiz/${quizId}`);
  }

  const questionAnswer = await prisma.quizAnswer.findMany({
    where: { quizId },
    include: {
      question: true,
    },
    orderBy: {
      question: {
        order: "asc",
      },
    },
  });

  return <QuizResult quizAnswer={questionAnswer} />;
}
