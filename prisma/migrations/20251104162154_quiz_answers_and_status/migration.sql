-- CreateEnum
CREATE TYPE "QuizStatus" AS ENUM ('INITIAL', 'COMPLETED', 'PAUSED');

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "explanation" TEXT;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "status" "QuizStatus" NOT NULL DEFAULT 'INITIAL';

-- CreateTable
CREATE TABLE "quiz_answer" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedIndex" INTEGER,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_answer_quizId_questionId_key" ON "quiz_answer"("quizId", "questionId");

-- AddForeignKey
ALTER TABLE "quiz_answer" ADD CONSTRAINT "quiz_answer_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answer" ADD CONSTRAINT "quiz_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
