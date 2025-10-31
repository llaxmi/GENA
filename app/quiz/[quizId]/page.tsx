import { QuizSection } from "@/features/quizset/quiz-section";
import { prisma } from "@/lib/auth";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const questions = await prisma.question.findMany({
    where: {
      quizId: quizId,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div>
      <QuizSection questions={questions} quizId={quizId} />
    </div>
  );
}
