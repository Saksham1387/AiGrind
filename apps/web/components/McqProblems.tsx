"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { getColor } from "../app/db/problem";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MCQProblem {
    id: string;
    question: string;
    title: string;
    explanation: string;
    category: string | null;
    solved: number,
    difficulty: string;    // Update to allow null
    options: {
      id: string;
      optionText: string;
      isCorrect: boolean;
      description: string;
      mcqProblemId: string;
    }[];
};

import SkeletonTable from './skeletons/problems';
const McqProblems = () => {
  const [mcqProblems, setMcqProblems] = useState<MCQProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await fetch('/api/mcqs').then(res => res.json());
      setMcqProblems(problems);
      setLoading(false);
    };
    fetchProblems();
  }, []);


  return (
    <section className="bg-white dark:bg-black py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">MCQ Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Here are some of the popular problems asked in the interviews.
          </p>
        </div>
        <div>
        <div>{loading ? <SkeletonTable /> : <McqProblemCard mcqProblems={mcqProblems} />}</div>
        </div>
      </div>
    </section>
  );
};

//@ts-ignore
const McqProblemCard = ({ mcqProblems }) => {
  const router = useRouter();

  const handleRoute = (id:any) => {
    router.push(`/mcq/${id}`);
  };

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white dark:hover:bg-black">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Solved</TableHead>
            <TableHead>Question</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           
          {mcqProblems.map((problem:any, index:any) => (
            <TableRow
              key={problem.id}
              className="hover:cursor-pointer dark:hover:bg-gray-900"
              onClick={() => handleRoute(problem.id)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>{problem.category}</TableCell>
              <TableCell className={getColor(problem.difficulty)}>
                {problem.difficulty}
              </TableCell>
              <TableCell>{problem.solved}</TableCell>
              <TableCell>{problem.question.substring(0, 20)}...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


export default McqProblems;
