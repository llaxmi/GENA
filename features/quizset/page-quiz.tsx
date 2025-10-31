import { Question } from "@/lib/generated/prisma";
import { QuizSection } from "./quiz-section";

export default function PageQuiz({
  questions,
  quizId,
}: {
  questions: Question[];
  quizId: string;
}) {
  return <QuizSection questions={questions} quizId={quizId} />;
}
