import prismaClient from "../src";

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "What is the primary function of a Generator in a GAN?",
      explanation: "The Generator in a GAN creates data samples that are intended to resemble real data.",
      title: "Goal of RL",
      category: "Generator in GAN",
      hidden: false,
      difficulty: "HARD",
      options: {
        create: [
          { optionText: "To generate realistic data samples", isCorrect: true, description: "" },
          { optionText: "To classify data samples", isCorrect: false, description: "" },
          { optionText: "To minimize loss functions", isCorrect: false, description: "" },
          { optionText: "To perform data preprocessing", isCorrect: false , description: "" },
        ],
      },
    },
  });

  console.log('MCQ Created:', newMCQ);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
});