import z from "zod";

export const textQuizSchema = z.object({
  name: z.string().min(1, "Quiz name is required"),
  numQuestions: z.number().min(1, "Number of questions must be at least 1"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  content: z.string().min(10, "Content must be at least 5 characters long"),
});

export const documentQuizSchema = z.object({
  name: z.string().optional(),
  numQuestions: z.number().min(1, "Number of questions must be at least 1"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  file: z.instanceof(File, { message: "Please select a file" }),
});

export type TextQuizSchemaType = z.infer<typeof textQuizSchema>;
export type DocumentQuizSchemaType = z.infer<typeof documentQuizSchema>;
