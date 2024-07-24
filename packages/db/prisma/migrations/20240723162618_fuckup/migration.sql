-- CreateTable
CREATE TABLE "UserMCQProblem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unsolved',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMCQProblem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMCQProblem" ADD CONSTRAINT "UserMCQProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMCQProblem" ADD CONSTRAINT "UserMCQProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "MCQProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
