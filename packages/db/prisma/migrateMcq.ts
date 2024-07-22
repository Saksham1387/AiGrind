// import { Client } from '@notionhq/client';
// import { PrismaClient } from '@prisma/client';

// // Initialize Notion client with API key
  
// const notion = new Client({ auth:"secret_9nC7iT4WKnZScdp2puGm308QsMEzTX6EFEIoIU63hwN"});
// // Initialize Prisma client
// const prisma = new PrismaClient();

// // Define types for the Notion blocks you are dealing with
// type NotionBlock = {
//   object: string;
//   id: string;
//   type: string;
//   heading_2?: {
//     text: Array<{ plain_text: string }>;
//   };
//   heading_3?: {
//     text: Array<{ plain_text: string }>;
//   };
//   paragraph?: {
//     text: Array<{ plain_text: string }>;
//   };
//   bulleted_list_item?: {
//     text: Array<{ plain_text: string }>;
//   };
//   toggle?: {
//     text: Array<{ plain_text: string }>;
//   };
// };

// // Fetch data from Notion API
// async function fetchNotionData(pageId: string) {
//   const response = await notion.blocks.children.list({
//     block_id: pageId,
//     page_size: 50,
//   });

//   return response.results as NotionBlock[];
// }

// // Parse and save data to the database
// async function parseAndSaveData() {
//   const pageId = '855801f6965c4fa5ad4b86ad70c641bb'; // Replace with your actual page ID
//   const blocks = await fetchNotionData(pageId);

//   for (const block of blocks) {
//     if (block.type === 'heading_2' && block.heading_2) {
//       const category = block.heading_2.text[0].plain_text;
//       const questions = await fetchNotionData(block.id);

//       for (const questionBlock of questions) {
//         if (questionBlock.type === 'paragraph' && questionBlock.paragraph) {
//           const difficulty = questionBlock.paragraph.text[0].plain_text;
//           console.log('category:', category, 'difficulty:', difficulty);
//           const mcqs = await fetchNotionData(questionBlock.id);

//           for (const mcqBlock of mcqs) {
//             if (mcqBlock.type === 'heading_3' && mcqBlock.heading_3) {
//               const title = mcqBlock.heading_3.text[0].plain_text;
//               const mcqDetails = await fetchNotionData(mcqBlock.id);

//               let question = '';
//               let options: any[] = [];
//               let correctOption = '';
//               let explanation = '';

//               for (const detail of mcqDetails) {
//                 if (detail.type === 'paragraph' && detail.paragraph) {
//                   question = detail.paragraph.text[0].plain_text;
//                 } else if (detail.type === 'bulleted_list_item' && detail.bulleted_list_item) {
//                   const optionText = detail.bulleted_list_item.text[0].plain_text;
//                   const isCorrect = optionText.startsWith('*');
//                   options.push({
//                     id: '',
//                     text: isCorrect ? optionText.slice(1) : optionText,
//                     isCorrect,
//                   });
//                 } else if (detail.type === 'toggle' && detail.toggle) {
//                   explanation = detail.toggle.text[0].plain_text;
//                 }
//               }

//               await prisma.mCQProblem.create({
//                 data: {
//                   title,
//                   question,
//                   explanation,
//                   category,
//                   difficulty: difficulty.toUpperCase() as 'EASY' | 'MEDIUM' | 'HARD', // Adjust this as necessary
//                   options: {
//                     create: options,
//                   },
//                 },
//               });
//             }
//           }
//         }
//       }
//     }
//   }
// }

// // Run the script
// parseAndSaveData()
//   .then(() => {
//     console.log('Data imported successfully');
//   })
//   .catch((error) => {
//     console.error('Error importing data:', error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


import { Client } from '@notionhq/client';
import prismaClient from "../src";

// Initialize Notion client with API key
const notion = new Client({ auth: "secret_9nC7iT4WKnZScdp2puGm308QsMEzTX6EFEIoIU63hwN" });
// Initialize Prisma client


// Define types for the Notion blocks you are dealing with
type NotionBlock = {
  object: string;
  id: string;
  type: string;
  heading_2?: {
    text: Array<{ plain_text: string }>;
  };
  heading_3?: {
    text: Array<{ plain_text: string }>;
  };
  paragraph?: {
    text: Array<{ plain_text: string }>;
  };
  bulleted_list_item?: {
    text: Array<{ plain_text: string }>;
  };
  toggle?: {
    text: Array<{ plain_text: string }>;
  };
};

// Fetch data from Notion API
async function fetchNotionData(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 50,
    });
    return response.results as NotionBlock[];
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    throw error;
  }
}

// Parse and save data to the database
async function parseAndSaveData() {
  const pageId = '855801f6965c4fa5ad4b86ad70c641bb'; // Replace with your actual page ID
  try {
    const blocks = await fetchNotionData(pageId);

    for (const block of blocks) {
      if (block.type === 'heading_2' && block.heading_2) {
        const category = block.heading_2.text[0].plain_text;
        const questions = await fetchNotionData(block.id);

        for (const questionBlock of questions) {
          if (questionBlock.type === 'paragraph' && questionBlock.paragraph) {
            const difficulty = questionBlock.paragraph.text[0].plain_text;
            console.log('Category:', category, 'Difficulty:', difficulty);
            const mcqs = await fetchNotionData(questionBlock.id);

            for (const mcqBlock of mcqs) {
              if (mcqBlock.type === 'heading_3' && mcqBlock.heading_3) {
                const title = mcqBlock.heading_3.text[0].plain_text;
                const mcqDetails = await fetchNotionData(mcqBlock.id);

                let question = '';
                let options: any[] = [];
                let correctOption = '';
                let explanation = '';

                for (const detail of mcqDetails) {
                  if (detail.type === 'paragraph' && detail.paragraph) {
                    question = detail.paragraph.text[0].plain_text;
                  } else if (detail.type === 'bulleted_list_item' && detail.bulleted_list_item) {
                    const optionText = detail.bulleted_list_item.text[0].plain_text;
                    const isCorrect = optionText.startsWith('*');
                    options.push({
                      text: isCorrect ? optionText.slice(1) : optionText,
                      isCorrect,
                    });
                  } else if (detail.type === 'toggle' && detail.toggle) {
                    explanation = detail.toggle.text[0].plain_text;
                  }
                }

                console.log('Inserting MCQProblem:', {
                  title,
                  question,
                  explanation,
                  category,
                  difficulty: difficulty.toUpperCase(),
                  options,
                });

                await prismaClient.mCQProblem.create({
                  data: {
                    title,
                    question,
                    explanation,
                    category,
                    difficulty: difficulty.toUpperCase() as 'EASY' | 'MEDIUM' | 'HARD', // Adjust this as necessary
                    options: {
                      create: options,
                    },
                  },
                });

                console.log(`Inserted MCQProblem with title: ${title}`);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error parsing and saving data:', error);
    throw error;
  }
}

// Run the script
parseAndSaveData()
  .then(() => {
    console.log('Data imported successfully');
  })
  .catch((error) => {
    console.error('Error importing data:', error);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });