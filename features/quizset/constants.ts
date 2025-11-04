export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"] as const;
export const QUESTION_COUNTS = [3, 5, 10, 15, 20] as const;
export const MAX_CHARACTERS = 25000;

export type QuizSubmissionSummary = {
  quizId: string;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  answers: {
    questionId: string;
    selectedIndex: number | null;
    isCorrect: boolean;
    correctIndex: number;
    order: number;
  }[];
};
export const getPerformanceText = (scorePercent: number) => {
  if (scorePercent >= 90) return "Outstanding! 🎉";
  if (scorePercent >= 75) return "Great job! 🚀";
  if (scorePercent >= 60) return "Good effort! 👍";
  if (scorePercent >= 40) return "Keep practicing! 💪";
  return "Don't give up! Try again!";
};

export const getPerformanceBg = (scorePercent: number) => {
  if (scorePercent >= 90)
    return "bg-gradient-to-r from-green-400/90 via-emerald-500/80 to-green-400/70";
  if (scorePercent >= 75)
    return "bg-gradient-to-r from-blue-400/90 via-blue-500/80 to-blue-400/70";
  if (scorePercent >= 60)
    return "bg-gradient-to-r from-yellow-300/90 via-yellow-500/70 to-yellow-300/60";
  if (scorePercent >= 40)
    return "bg-gradient-to-r from-orange-300/90 via-orange-500/70 to-orange-300/60";
  return "bg-gradient-to-r from-red-300/90 via-red-400/80 to-red-200/70";
};

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
export type QuestionCount = (typeof QUESTION_COUNTS)[number];
