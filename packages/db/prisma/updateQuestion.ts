import { LANGUAGE_MAPPING } from "@repo/common/language";
import fs from "fs";
import prismaClient from "../src";
import { readFile } from 'fs/promises';

const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";

function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function readFileContent(filePath: string): Promise<string> {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
}

async function main(problemSlug: string, problemTitle: string) {
  try {
    const problemStatement = await promisifedReadFile(
      `${MOUNT_PATH}/${problemSlug}/Problem.md`
    );
    const difficultyText = await readFileContent(`${MOUNT_PATH}/${problemSlug}/dif.txt`);
    const difficulty = difficultyText.trim().toUpperCase() as 'EASY' | 'MEDIUM' | 'HARD';
    const solution = await readFileContent(`${MOUNT_PATH}/${problemSlug}/Solution.md`);
    const problem = await prismaClient.problem.upsert({
      where: {
        slug: problemSlug,
      },
      create: {
        title: problemTitle,
        slug: problemSlug,
        description: problemStatement,
        hidden: false,
        difficulty: difficulty,
        solution: solution,
        
      },
      update: {
        description: problemStatement,
      },
    });

    await Promise.all(
      Object.keys(LANGUAGE_MAPPING).map(async (language) => {
        try {
          const code = await promisifedReadFile(
            `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
          );
          console.log(code);
          console.log("control here");

          const languageRecord = LANGUAGE_MAPPING[language];
          if (!languageRecord) {
            throw new Error(`Language ${language} does not exist in LANGUAGE_MAPPING`);
          }

          await prismaClient.defaultCode.upsert({
            where: {
              problemId_languageId: {
                problemId: problem.id,
                languageId: languageRecord.internal,
              },
            },
            create: {
              problemId: problem.id,
              languageId: languageRecord.internal,
              code,
            },
            update: {
              code,
            },
          });
        } catch (error) {
          console.error(`Error processing language ${language} for problem ${problemSlug}:`, error);
        }
      })
    );
  } catch (error) {
    console.error(`Error processing problem ${problemSlug}:`, error);
  }
}

export function addProblemsInDB() {
  fs.readdir(MOUNT_PATH, (err, dirs) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    dirs.forEach(async (dir) => {
      try {
        await main(dir, dir);
      } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
      }
    });
  });
}

