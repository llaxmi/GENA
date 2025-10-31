import LibraryStatistics from "@/features/library/statistics";
import { prisma } from "@/lib/auth";
import { getUser } from "@/lib/session";

export default async function LibraryPage() {
  const user = await getUser();
  const quizzes = await prisma.quiz.findMany({
    where: {
      userId: user?.id,
    },
  });
  const { totalCorrectAnswers, totalIncorrectAnswers } = quizzes.reduce(
    (acc, quiz) => {
      acc.totalCorrectAnswers += quiz.totalCorrectAnswers;
      acc.totalIncorrectAnswers += quiz.totalIncorrectAnswers;
      return acc;
    },
    { totalCorrectAnswers: 0, totalIncorrectAnswers: 0 }
  );

  return (
    <LibraryStatistics
      totalCorrectAnswers={totalCorrectAnswers}
      totalIncorrectAnswers={totalIncorrectAnswers}
      allQuestions={totalCorrectAnswers + totalIncorrectAnswers}
    />
  );
}
