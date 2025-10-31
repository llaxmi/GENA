/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `question` table. All the data in the column will be lost.
  - Added the required column `correctIndex` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" DROP COLUMN "correctAnswer",
ADD COLUMN     "correctIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalCorrectAnswers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalIncorrectAnswers" INTEGER NOT NULL DEFAULT 0;
