import prismaClient from "../src";
// import { PrismaClient } from "@prisma/client";

// const prismaClient = new PrismaClient();

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "What is the primary purpose of the Transmission Control Protocol (TCP) in the TCP/IP model?",
      description: "Choose the correct option.",
      category: "Geographhy",
      hidden: false,
      difficulty: "HARD",
      options: {
        create: [
          { optionText: "To provide a connectionless data transfer service", isCorrect: true, description: "The capital of France." },
          { optionText: "To resolve domain names to IP addresses", isCorrect: false, description: "The capital of England." },
          { optionText: "To ensure reliable and ordered delivery of data", isCorrect: false, description: "The capital of Germany." },
          { optionText: "To handle routing of data packets across networks", isCorrect: false , description: "The capital of Spain." },
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