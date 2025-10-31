export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"] as const;
export const QUESTION_COUNTS = [3, 5, 10, 15, 20] as const;
export const MAX_CHARACTERS = 25000;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
export type QuestionCount = (typeof QUESTION_COUNTS)[number];
