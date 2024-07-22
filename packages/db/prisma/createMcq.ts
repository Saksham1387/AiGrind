import prismaClient from "../src";

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "What is the main goal of Reinforcement Learning?",
      explanation: "RL aims to maximize the cumulative reward that an agent receives through its actions in an environment.",
      title: "Goal of RL",
      category: "Reinforcement Learning",
      hidden: false,
      difficulty: "EASY",
      options: {
        create: [
          { optionText: "Minimizing loss", isCorrect: false, description: "The capital of France." },
          { optionText: "Maximizing cumulative reward", isCorrect: true, description: "The capital of England." },
          { optionText: "Predicting future values", isCorrect: false, description: "The capital of Germany." },
          { optionText: " Reducing error", isCorrect: false , description: "The capital of Spain." },
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