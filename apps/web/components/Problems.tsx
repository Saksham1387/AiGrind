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
import SkeletonTable from './skeletons/problems';
import { Button } from "@repo/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  solved: number;
}

const ITEMS_PER_PAGE = 10;

const Problems = () => {
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await fetch('/api/submission/all').then(res => res.json());
      setProblems(problems);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  // Calculate the index of the first and last problem for the current page
  const indexOfLastProblem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProblem = indexOfLastProblem - ITEMS_PER_PAGE;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  // Calculate total pages
  const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);

  const handleRoute = (id: string) => {
    router.push(`/problem/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Coding Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Strengthen your ML concepts by coding in pure python
          </p>
        </div>
        <div className="">
          {loading ? (
            <SkeletonTable />
          ) : (
            <>
              <ProblemCard problems={currentProblems} handleRoute={handleRoute} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

function ProblemCard({ problems, handleRoute }: { problems: Problem[], handleRoute: (id: string) => void }) {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Submissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem: Problem, index: number) => (
            <TableRow
              key={problem.id}
              className="hover:bg-gray-100 hover:cursor-pointer"
              onClick={() => handleRoute(problem.id)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell className={getColor(problem.difficulty)}>{problem.difficulty}</TableCell>
              <TableCell>{problem.solved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="mr-3 bg-transparent text-white hover:bg-slate-700"
          >
            <ChevronLeft></ChevronLeft>
            Previous
          </Button>
          <span className="text-gray-700 dark:text-gray-300 mt-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="ml-3 bg-transparent text-white hover:bg-slate-700 "
          >
            Next
            <ChevronRight></ChevronRight>
          </Button>
        </div>
  );
}

export default Problems;
