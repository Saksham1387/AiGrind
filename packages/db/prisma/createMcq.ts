import prismaClient from "../src";

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "What does the 'Q' in Q-Learning stand for?",
      explanation: " The 'Q' stands for Quality, representing the quality of a state-action combination in terms of expected rewards.",
      title: "Q Learning",
      category: "Reinforcement Learning",
      hidden: false,
      difficulty: "EASY",
      options: {
        create: [
          { optionText: "Quality", isCorrect: true, description: "The capital of France." },
          { optionText: "Quantity", isCorrect: false, description: "The capital of England." },
          { optionText: "Query", isCorrect: false, description: "The capital of Germany." },
          { optionText: "Quota", isCorrect: false , description: "The capital of Spain." },
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