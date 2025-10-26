/*
  Warnings:

  - You are about to drop the column `correct` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctAnswer` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_userId_fkey";

-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_contentId_fkey";

-- AlterTable
ALTER TABLE "question" DROP COLUMN "correct",
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "quiz" DROP COLUMN "contentId";

-- DropTable
DROP TABLE "content";

-- DropEnum
DROP TYPE "content_type";

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");
