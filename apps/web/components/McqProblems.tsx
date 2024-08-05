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
import { useEffect, useMemo, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ClockIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";

import { Button } from "@repo/ui/button";
import { SkeletonTable } from "./skeletons/problems";
import { MCQProblem } from "../app/types/Finaltypes";

const categories = [
  "NLP",
  "Reinforcement Learning",
  "Deep Learning",
  "Machine Learning",
  "Linear Algebra",
  "Generative AI",
  "Prompt Engineering",
];

interface McqProblemsProps {
  mcqProblems: MCQProblem[];
}

const ITEMS_PER_PAGE = 20;

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

//@ts-ignore
const McqProblems = ({ mcqProblems }) => {
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const [isDifficultyDropdownVisible, setIsDifficultyDropdownVisible] =
    useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(mcqProblems);
  }, []);
  const difficulties = ["Easy", "Medium", "Hard"];

  const filteredProblems = useMemo(() => {
    const filtered = mcqProblems.filter((problem: any) => {
      if (selectedStatus && problem.solved !== selectedStatus) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(problem.category || "")
      )
        return false;
      if (
        selectedDifficulties.length > 0 &&
        !selectedDifficulties.includes(problem.difficulty.toLowerCase())
      )
        return false;
      return true;
    });

    const easyProblems = filtered.filter(
      (problem: any) => problem.difficulty.toLowerCase() === "easy"
    );
    const mediumProblems = filtered.filter(
      (problem: any) => problem.difficulty.toLowerCase() === "medium"
    );
    const hardProblems = filtered.filter(
      (problem: any) => problem.difficulty.toLowerCase() === "hard"
    );

    return [
      ...shuffleArray(easyProblems),
      ...shuffleArray(mediumProblems),
      ...shuffleArray(hardProblems),
    ];
  }, [mcqProblems, selectedStatus, selectedCategories, selectedDifficulties]);

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProblems.slice(startIndex, endIndex);
  }, [filteredProblems, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProblems.length / ITEMS_PER_PAGE),
    [filteredProblems]
  );

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    setIsStatusDropdownVisible(false);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
    console.log(selectedCategories);
    setCurrentPage(1);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulties((prevDifficulties) =>
      prevDifficulties.includes(difficulty.toLowerCase())
        ? prevDifficulties.filter((d) => d !== difficulty.toLowerCase())
        : [...prevDifficulties, difficulty.toLowerCase()]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-darkgray py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">MCQ Problems</h2>
          <p className="text-white pb-5">
            Here are some of the popular problems for interview prep
          </p>
          <div className="relative flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 mb-8">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-mediumgray text-white px-4 py-2 rounded flex items-center">
                  <div className="flex flex-row">
                    Status
                    <ChevronDownIcon className="ml-2" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-mediumgray text-white border-none">
                  <DropdownMenuItem
                    onClick={() => handleStatusFilter(null)}
                    className="hover:bg-lightgray"
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-lightgray"
                    onClick={() => handleStatusFilter("solved")}
                  >
                    Solved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-lightgray"
                    onClick={() => handleStatusFilter("unsolved")}
                  >
                    Unsolved
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-mediumgray text-white px-4 py-2 rounded flex items-center">
                    Category
                    <ChevronDownIcon className="ml-2" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] sm:w-[450px] bg-lightgray text-white dark:bg-mediumgray border border-darkgray rounded shadow-lg z-10 p-2 grid grid-cols-1 sm:grid-cols-1 gap-2 mb-10">
                  {categories.map((category) => (
                    <DropdownMenuItem asChild key={category}>
                      <label className="flex items-center text-left">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryFilter(category)}
                          className="mr-2 accent-green-500"
                        />
                        <span className="ml-2">{category}</span>
                      </label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="bg-mediumgray text-white px-4 py-2 rounded flex items-center">
                  Difficulty
                  <ChevronDownIcon className="ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-20 bg-lightgray dark:bg-mediumgray border border-darkgray rounded-lg shadow-lg z-10">
                {difficulties.map((difficulty) => (
                  <DropdownMenuItem
                    key={difficulty}
                    className={`block w-full text-left px-4 py-2 hover:bg-mediumgray items-center ${
                      difficulty === "Easy"
                        ? "text-green-500"
                        : difficulty === "Medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(
                        difficulty.toLowerCase()
                      )}
                      onChange={() =>
                        handleDifficultyFilter(difficulty.toLowerCase())
                      }
                      className="mr-2 accent-green-500"
                    />
                    {difficulty}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={`${
            isStatusDropdownVisible ||
            isCategoryDropdownVisible ||
            isDifficultyDropdownVisible
              ? "mt-44"
              : ""
          }`}
        >
          {loading ? (
            <SkeletonTable />
          ) : (
            <McqProblemCard mcqProblems={paginatedProblems} />
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 bg-transparent text-white hover:bg-mediumgray"
          >
            <ChevronLeft />
            Previous
          </Button>
          <span className="text-white mt-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-3 text-white bg-transparent hover:bg-mediumgray"
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

const McqProblemCard = ({ mcqProblems }: { mcqProblems: MCQProblem[] }) => {
  const router = useRouter();

  const handleRoute = (id: string) => {
    router.push(`/mcq/${id}`);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className=" hover:bg-transparent">
            <TableHead className="text-white">S.No</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Difficulty</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Question</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mcqProblems.map((problem, index) => (
            <TableRow
              key={problem.id}
              className="hover:cursor-pointer hover:bg-mediumgray"
              onClick={() => handleRoute(problem.id)}
            >
              <TableCell className="text-white">{index + 1}</TableCell>
              <TableCell className="text-white">{problem.title}</TableCell>
              <TableCell className="text-white">{problem.category}</TableCell>
              <TableCell
                className={`text-white ${getColor(problem.difficulty)}`}
              >
                {problem.difficulty}
              </TableCell>
              <TableCell
                className={
                  problem.solved === "unsolved"
                    ? "font-bold text-white"
                    : "text-white"
                }
              >
                {problem.solved === "unsolved" ? (
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                )}
              </TableCell>
              <TableCell className="text-white">
                {problem.question.substring(0, 20)}...
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default McqProblems;
