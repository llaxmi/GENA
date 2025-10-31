import z from "zod";

export const textQuizSchema = z.object({
  name: z.string(),
  numQuestions: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  content: z.string(),
});

export const documentQuizSchema = z.object({
  name: z.string().optional(),
  numQuestions: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  file: z.instanceof(File),
});

export type TextQuizSchemaType = z.infer<typeof textQuizSchema>;
export type DocumentQuizSchemaType = z.infer<typeof documentQuizSchema>;
