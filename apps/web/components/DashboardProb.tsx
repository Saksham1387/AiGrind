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
import { useState, useEffect } from "react";
import { ClockIcon, CheckIcon } from "lucide-react";
import { SkeletonTable } from "./skeletons/problems";

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD"; // Adjust as per your actual data
  solved: string | number;
  // Add other properties as needed
}

function renderProblemStatus(problem: Problem) {
  if (problem.solved === "unsolved") {
    return <ClockIcon className="h-4 w-4 text-gray-500" />;
  } else if (problem.solved === "solved") {
    return <CheckIcon className="h-4 w-4 text-green-500" />;
  } else if (!isNaN(Number(problem.solved))) {
    return <span>{problem.solved}</span>;
  } else {
    return null; // Optional: Handle any unexpected cases
  }
}
//@ts-ignore
const DashboardProblems = ({ problems }) => {
  const [loading, setLoading] = useState(false); // Start with loading as true
  const selectRandomProblems = (array: Problem[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };



  return (
    <section className="text-white py-8 md:py-12 min-h-screen border-none">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">TOP 20 !</h2>
          <p className="mb-3">
            Check out the most popular 20 Questions asked in the ML Interviews
            Today
          </p>
        </div>
        <div>
          {/* {loading ? (
            <SkeletonTable />
          ) : ( */}
            <div>
              <ProblemCard problems={selectRandomProblems(problems, 20)} />
            </div>
          {/* )} */}
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
    <div className="border-none">
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
              className="hover:cursor-pointer hover:bg-mediumgray"
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
