/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserMCQProblem` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `UserMCQProblem` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserMCQProblem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserMCQProblem` table. All the data in the column will be lost.
  - Added the required column `mcqProblemId` to the `UserMCQProblem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserMCQProblem" DROP CONSTRAINT "UserMCQProblem_problemId_fkey";

-- AlterTable
ALTER TABLE "UserMCQProblem" DROP COLUMN "createdAt",
DROP COLUMN "problemId",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "mcqProblemId" TEXT NOT NULL,
ADD COLUMN     "solved" TEXT NOT NULL DEFAULT 'unsolved';

-- AddForeignKey
ALTER TABLE "UserMCQProblem" ADD CONSTRAINT "UserMCQProblem_mcqProblemId_fkey" FOREIGN KEY ("mcqProblemId") REFERENCES "MCQProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
