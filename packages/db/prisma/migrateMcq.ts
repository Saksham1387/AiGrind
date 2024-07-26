import { Client } from '@notionhq/client';
import prismaClient from '../src';

// Initialize Notion client
const notion = new Client({ auth: "secret_9nC7iT4WKnZScdp2puGm308QsMEzTX6EFEIoIU63hwN" });

// Categories and their corresponding Notion database IDs
const categoryDBs = {
  "Reinforcement Learning": {
    easy: 'c2a20d37b07340ceb1725c8d84b11c77',
    medium: '3bd3eea9785f4b92818ced1e71b36cf1',
    hard: '65fe6c35d2e84a75bce70f42c22537a2'
  },
  "Deep Learning": {
    easy: 'efa1a6ab350d4280841726e286e60c7a',
    medium: '337790514b654ed591869ad534a2764d',
    hard: 'b4bb23f0f8bf471089addf5ff4299800'
  },
  "Generative AI": {
    easy: 'e3db0e9f2337431797f340e4cf349abd',
    medium: 'f4fc6851fb2949c4ad885ddaf722cadf',
    hard: '8d0acc2c09734bfd84a141319c3aa3a0'
  },
  "Machine Learning": {
    easy: '42f21b3284ff435a943ce5de6a5e62a9',
    medium: '0e2ef72234be4db1818d144f60b1be3b',
    hard: '283b9a63d0ba46a1932904430a69f6d1'
  },
  "Linear Algebra": {
    easy: '9c0ffe69e12343d7859b3b8fb232c42c',
    medium: '8cea16e77ea04c739645241d24e5f53f',
    hard: '40b7cf1fd9a64f68b3976f03a7e1ba97'
  },
  "NLP": {
    easy: 'fa76149b8c6d480ca98c71d5c93a2c5c',
    medium: 'e10ec4ab50d94ed08c2b664a74130b05',
    hard: '9604fd8e776d4a098e003218be2f7498'
  }
};

// Helper function to fetch data from Notion
//@ts-ignore
async function fetchNotionDatabase(databaseId) {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
}

// Helper function to parse Notion pages to MCQs
//@ts-ignore
function parseNotionPageToMCQ(page, difficulty, category) {
  const properties = page.properties;
  
  console.log(properties); // Debugging line to inspect the properties structure

  const question = properties['Column 1']?.rich_text?.[0]?.text?.content || '';
  const explanation = properties['Column 4']?.rich_text?.[0]?.text?.content || '';
  const title = properties.Title?.title?.[0]?.text?.content || '';
  const optionsText = properties['Column 2']?.rich_text?.[0]?.text?.content || '';
  const correctOptionText = properties['Column 3']?.rich_text?.[0]?.text?.content || '';

  // Check if all required properties were found
  if (!question || !explanation || !title || !optionsText || !correctOptionText) {
    console.error('Missing required properties:', { question, explanation, title, optionsText, correctOptionText });
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
  for (const [category, databases] of Object.entries(categoryDBs)) {
    console.log(`Processing category: ${category}`);

    for (const [level, databaseId] of Object.entries(databases)) {
      //@ts-ignore
      const notionPages = await fetchNotionDatabase(databaseId);

      for (const page of notionPages) {
        try {
          const newMCQ = parseNotionPageToMCQ(page, level.toUpperCase(), category);

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });