import prismaClient from "../src";

async function clearMCQProblems() {
  try {
    // Clear all records in the MCQProblem table
    await prismaClient.userMCQProblem.deleteMany();
    await prismaClient.mCQSubmission.deleteMany();
    await prismaClient.mCQOption.deleteMany();
    await prismaClient.mCQProblem.deleteMany();

    console.log("All MCQProblem records have been cleared.");
  } catch (error) {
    console.error("Error clearing MCQProblem records:", error);
  } finally {
    // Disconnect Prisma Client
    await prismaClient.$disconnect();
  }
}

clearMCQProblems();
