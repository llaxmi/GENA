import { quizObjectSchema, QuizSchemaType } from "@/schema/quiz.schema";
import { generateObject, ModelMessage } from "ai";
import { ollama } from "ollama-ai-provider-v2";

const quizPrompt = (numQuestions: number, difficulty: string) => `
You are an expert quiz generator. Generate ${numQuestions} quiz questions based on the following content.

Requirements:
- Generate exactly ${numQuestions} questions
- Difficulty level: ${difficulty}
- Each question must have exactly 4 multiple choice options
- Include one correct answer and three plausible distractors
- Questions should test understanding, not just memorization
`;

class QuizGenerator {
  private async getMessageContent(data: QuizSchemaType) {
    const { numQuestions, difficulty, type, content, file } = data;
    const messages: ModelMessage[] = [
      {
        role: "system",
        content: quizPrompt(numQuestions, difficulty),
      },
    ];

    if (type === "text" && content) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      });
    } else if (file && type === "document") {
      const buffer = await file.arrayBuffer()!;
      messages.push({
        role: "user",
        content: [
          {
            type: "file",
            filename: file.name,
            data: buffer,
            mediaType: file.type ?? "application/pdf",
          },
        ],
      });
    }

    return messages;
  }

  async generateQuiz(data: QuizSchemaType) {
    const messages = await this.getMessageContent(data);

    const result = await generateObject({
      model: ollama.chat("llama3.1:8b"),
      messages,
      schemaName: "quiz",
      schemaDescription: "A quiz with questions and answers",
      schema: quizObjectSchema,
    });

    return result.object.questions;
  }
}

export default new QuizGenerator();
