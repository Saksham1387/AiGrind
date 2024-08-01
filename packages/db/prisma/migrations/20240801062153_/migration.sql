/*
  Warnings:

  - A unique constraint covering the columns `[userId,mcqProblemId]` on the table `UserMCQProblem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "solution" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserMCQProblem_userId_mcqProblemId_key" ON "UserMCQProblem"("userId", "mcqProblemId");
