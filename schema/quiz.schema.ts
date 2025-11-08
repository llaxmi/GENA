import { z } from "zod";

export const quizSchema = z.object({
  type: z.enum(["text", "document"]),
  name: z.string(),
  numQuestions: z.coerce.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  content: z.string().optional().nullable(),
  file: z.instanceof(File).optional().nullable(),
});

export const quizObjectSchema = z.object({
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

export type QuizObjectSchemaType = z.infer<typeof quizObjectSchema>;
export type QuizSchemaType = z.infer<typeof quizSchema>;
