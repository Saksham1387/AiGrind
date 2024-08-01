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
import { useEffect, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ClockIcon,
  CheckIcon
} from "lucide-react";
import { MCQProblem, Problem } from "../app/types/types";

import { Button } from "@repo/ui/button";
import { SkeletonTable } from "./skeletons/problems";

function renderProblemStatus(problem:any) {
  if (problem.solved === "unsolved") {
    return <ClockIcon className="h-4 w-4 text-gray-500" />;
  } else if (problem.solved === "solved") {
    return <CheckIcon className="h-4 w-4 text-green-500" />;
  } else if (!isNaN(problem.solved)) {
    return <span>{problem.solved}</span>;
  } else {
    return null; // Optional: Handle any unexpected cases
  }
}

const DashboardProblems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<
    "default" | "hard-to-easy" | "easy-to-hard"
  >("default");
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = ""
      const mcqProblems = await fetch("/api/mcqs").then((res) => res.json());
      const combinedProblems = [...problems, ...mcqProblems];
      const randomProblems = selectRandomProblems(combinedProblems, 20);
      setProblems(randomProblems);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  const selectRandomProblems = (array: any[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleRoute = (id: string) => {
    router.push(`/problem/${id}`);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === "default") return "hard-to-easy";
      if (prevOrder === "hard-to-easy") return "easy-to-hard";
      return "default";
    });
  };

  const sortedProblems = () => {
    if (sortOrder === "default") return problems;

    const difficulties = ["Easy", "Medium", "Hard"];
    return problems.slice().sort((a, b) => {
      if (sortOrder === "hard-to-easy") {
        return (
          difficulties.indexOf(b.difficulty) -
          difficulties.indexOf(a.difficulty)
        );
      } else {
        return (
          difficulties.indexOf(a.difficulty) -
          difficulties.indexOf(b.difficulty)
        );
      }
    });
  };

  return (
    <section className=" text-white py-8 md:py-12 min-h-screen border-none">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">TOP 20 !</h2>
          <p className="mb-3">
            Check out the most popular 20 Questions asked in the ML Interviews Today
          </p>
        </div>
        <div>
          {loading ? (
            <SkeletonTable />
          ) : (
            <div>
              <ProblemCard
                problems={sortedProblems()}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProblemCard = ({
  problems,
  sortOrder,
  setSortOrder,
}: {
  problems: Problem[];
  sortOrder: string;
  setSortOrder: any;
}) => {
  const router = useRouter();

  const handleRoute = (id: string) => {
    router.push(`/mcq/${id}`);
  };

  const handleSort = () => {
    setSortOrder((prevOrder:any) => {
      if (prevOrder === "default") return "hard-to-easy";
      if (prevOrder === "hard-to-easy") return "easy-to-hard";
      return "default";
    });
  };

  return (
    <div className="border-none">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead
              onClick={handleSort}
              className="cursor-pointer flex items-center"
            >
              Difficulty
              
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem: any, index: any) => (
            <TableRow
              className=" hover:cursor-pointer hover:bg-mediumgray"
              key={problem.id}
              onClick={() => {
                handleRoute(problem.id);
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell className={getColor(problem.difficulty)}>
                {problem.difficulty}
              </TableCell>
              <TableCell> 
              {renderProblemStatus(problem)}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardProblems;