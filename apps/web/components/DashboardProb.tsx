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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClockIcon, CheckIcon } from "lucide-react";
import seedrandom from "seedrandom";

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  solved: string | number;
}

function renderProblemStatus(problem: Problem) {
  if (problem.solved === "unsolved") {
    return <ClockIcon className="h-4 w-4 text-gray-500" />;
  } else if (problem.solved === "solved") {
    return <CheckIcon className="h-4 w-4 text-green-500" />;
  } else if (!isNaN(Number(problem.solved))) {
    return <span>{problem.solved}</span>;
  } else {
    return null;
  }
}
//@ts-ignore
const DashboardProblems = ({ problems }) => {
  const [loading, setLoading] = useState(false);

  const selectRandomProblems = (array: Problem[], count: number) => {
    const today = new Date();
    const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const rng = seedrandom(seed);

    const shuffled = array
      .map((value) => ({ value, sort: rng() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled.slice(0, count);
  };

  const count = 20;
  const selectedProblems = selectRandomProblems(problems, count);
 

  return (
    <section className="text-black py-8 md:py-12 min-h-screen border-none  ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 ">TOP 20 !</h2>
          <p className="mb-3">
            Check out the most popular 20 Questions asked in the ML Interviews
            Today
          </p>
        </div>
        <div>
          <div>
            <ProblemCard problems={selectedProblems} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemCard = ({ problems }: { problems: Problem[] }) => {
  const router = useRouter();

  const handleRoute = (id: string) => {
    router.push(`/mcq/${id}`);
  };

  return (
    <div className="border-none ">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="cursor-pointer flex items-center">
              Difficulty
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow
              className="hover:cursor-pointer "
              key={problem.id}
              onClick={() => handleRoute(problem.id)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell className={getColor(problem.difficulty)}>
                {problem.difficulty}
              </TableCell>
              <TableCell>{renderProblemStatus(problem)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardProblems;
