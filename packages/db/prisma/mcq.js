const Client = require('@notionhq/client').Client;
const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();
const notion = new Client({ auth: 'secret_9nC7iT4WKnZScdp2puGm308QsMEzTX6EFEIoIU63hwN' });


async function fetchQuizData() {
  try {
    const response = await notion.databases.query({ database_id: "d7ba830866b2448e823efb8fef521001" });
    console.log('Response:', response); // Log the response

    return response.results.map((page) => {
      console.log('Page properties:', page.properties); // Log properties for each page

      const titleProperty = page.properties.Title ? page.properties.Title.title[0].plain_text : 'No Title';
      const questionProperty = page.properties.Question ? page.properties.Question.question[0].plain_text : 'No Question';
      const explanationProperty = page.properties.Explanation ? page.properties.Explanation.explanation[0].plain_text : 'No Explanation';
      const categoryProperty = page.properties.Category && page.properties.Category.select ? page.properties.Category.select.name : null;
      const optionsProperty = page.properties.Options ? page.properties.Options.multi_select.map((option) => option.name) : [];
      const difficultyProperty = page.properties.Difficulty && page.properties.Difficulty.select ? page.properties.Difficulty.select.name : 'EASY';

      return {
        title: titleProperty,
        question: questionProperty,
        explanation: explanationProperty,
        category: categoryProperty,
        options: optionsProperty,
        difficulty: difficultyProperty
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error
  }
}

async function main() {
  const quizData = await fetchQuizData();

  for (const questionData of quizData) {
    const options = await Promise.all(
      questionData.options.map(async (option, index) => {
        return prisma.mCQOption.create({
          data: {
            text: option,
            isCorrect: false, // Adjust this based on your logic for correct options
            order: index,
          }
        });
      })
    );

    await prisma.mCQProblem.create({
      data: {
        title: questionData.title,
        question: questionData.question,
        explanation: questionData.explanation,
        category: "NLP",
        difficulty: questionData.difficulty,
        hidden: false,
        options: {
          connect: options.map(option => ({ id: option.id }))
        }
      }
    });
  }

  console.log("Quiz data seeded successfully");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });