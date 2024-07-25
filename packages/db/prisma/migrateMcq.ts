import { Client } from '@notionhq/client';
import prismaClient from '../src';

// Initialize Notion client
const notion = new Client({ auth: "secret_9nC7iT4WKnZScdp2puGm308QsMEzTX6EFEIoIU63hwN" });

// Notion database IDs for each level
const notionDBs = {
  easy: '42f21b3284ff435a943ce5de6a5e62a9',
  medium: '0e2ef72234be4db1818d144f60b1be3b',
  hard: '283b9a63d0ba46a1932904430a69f6d1',
};

// Helper function to fetch data from Notion
//@ts-ignore
async function fetchNotionDatabase(databaseId) {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
}

// Helper function to parse Notion pages to MCQs
//@ts-ignore
function parseNotionPageToMCQ(page, difficulty) {
  const properties = page.properties;
  
  console.log(properties); // Debugging line to inspect the properties structure

  const question = properties['Column 1']?.rich_text?.[0]?.text?.content || '';
  const explanation = properties['Column 4']?.rich_text?.[0]?.text?.content || '';
  const title = properties.Title?.title?.[0]?.text?.content || '';
  const category = "Machine Learning"; // Assuming this is a constant value for now
  const optionsText = properties['Column 2']?.rich_text?.[0]?.text?.content || '';
  const correctOptionText = properties['Column 3']?.rich_text?.[0]?.text?.content || '';

  // Check if all required properties were found
  if (!question || !explanation || !title || !category || !optionsText || !correctOptionText) {
    console.error('Missing required properties:', { question, explanation, title, category, optionsText, correctOptionText });
    throw new Error('Missing required properties in the Notion page');
  }

  // Split options text into individual options, assuming they are separated by commas
  //@ts-ignore
  const optionsArray = optionsText.split(',').map(option => option.trim());
//@ts-ignore
  const options = optionsArray.map(option => ({
    optionText: option,
    isCorrect: option === correctOptionText,
    description: "",
  }));

  return {
    question,
    explanation,
    title,
    category,
    hidden: false, // Adjust this if you have a hidden property
    difficulty,
    options: { create: options },
  };
}

async function main() {
  const levels = ['easy', 'medium', 'hard'];

  for (const level of levels) {
    //@ts-ignore
    const notionPages = await fetchNotionDatabase(notionDBs[level]);

    for (const page of notionPages) {
      try {
        const newMCQ = parseNotionPageToMCQ(page, level.toUpperCase());

        await prismaClient.mCQProblem.create({
          data: newMCQ,
        });

        console.log(`MCQ Created: ${newMCQ.question}`);
      } catch (error) {
        console.error('Error creating MCQ:', error);
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });