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
import { CheckIcon, ChevronDownIcon, ChevronLeft, ChevronRight, ClockIcon } from "lucide-react";

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
];

interface McqProblemsProps {
  mcqProblems: MCQProblem[];
}

const ITEMS_PER_PAGE = 20;

//@ts-ignore
const McqProblems = ({mcqProblems}) => {
  // const [mcqProblems, setMcqProblems] = useState<MCQProblem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const [isDifficultyDropdownVisible, setIsDifficultyDropdownVisible] =
    useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     try {
  //       const response = await fetch("/api/mcqs");
  //       const problems = await response.json();
  //       if (Array.isArray(problems)) {
  //         setMcqProblems(problems);
  //       } else {
  //         console.error("API response is not an array:", problems);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch MCQ problems:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProblems();
  // }, []);
  useEffect(() => {
    console.log(mcqProblems);
  }
  , []);
  const filteredProblems = useMemo(() => {
    return mcqProblems.filter((problem:any) => {
      if (selectedStatus && problem.solved !== selectedStatus) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(problem.category || "")
      )
        return false;
      if (
        selectedDifficulty &&
        problem.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()
      )
        return false;
      return true;
    });
  }, [mcqProblems, selectedStatus, selectedCategories, selectedDifficulty]);

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
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleDifficultyFilter = (difficulty: string | null) => {
    setSelectedDifficulty(difficulty);
    setIsDifficultyDropdownVisible(false);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleStatusDropdown = () => {
    setIsStatusDropdownVisible(!isStatusDropdownVisible);
    setIsCategoryDropdownVisible(false);
    setIsDifficultyDropdownVisible(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
    setIsStatusDropdownVisible(false);
    setIsDifficultyDropdownVisible(false);
  };

  const toggleDifficultyDropdown = () => {
    setIsDifficultyDropdownVisible(!isDifficultyDropdownVisible);
    setIsStatusDropdownVisible(false);
    setIsCategoryDropdownVisible(false);
  };

  return (
    <section className="bg-darkgray py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">MCQ Problems</h2>
          <p className="text-white pb-5">
            Here are some of the popular problems for interview prep
          </p>
          <div className="relative flex justify-center gap-16 mb-8">
            <div className="relative">
              <button
                onClick={toggleStatusDropdown}
                className="bg-mediumgray text-white px-4 py-2 rounded flex items-center"
              >
                Status
                <ChevronDownIcon className="ml-2" />
              </button>
              {isStatusDropdownVisible && (
                <div className="absolute mt-2 w-48 bg-lightgray dark:bg-mediumgray border border-darkgray rounded shadow-lg z-10">
                  <button
                    onClick={() => handleStatusFilter(null)}
                    className="block w-full text-left px-4 py-2 border-b border-darkgray hover:bg-darkgray"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleStatusFilter("solved")}
                    className="block w-full text-left px-4 py-2 border-b border-darkgray hover:bg-darkgray"
                  >
                    Solved
                  </button>
                  <button
                    onClick={() => handleStatusFilter("unsolved")}
                    className="block w-full text-left px-4 py-2 hover:bg-darkgray"
                  >
                    Unsolved
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className="bg-mediumgray text-white px-4 py-2 rounded flex items-center"
              >
                Category
                <ChevronDownIcon className="ml-2" />
              </button>
              {isCategoryDropdownVisible && (
                <div className="absolute mt-2 w-[450px] bg-lightgray dark:bg-mediumgray border border-darkgray rounded shadow-lg z-10 p-4 grid grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center text-left"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryFilter(category)}
                        className="mr-2 accent-green-500"
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleDifficultyDropdown}
                className="bg-mediumgray text-white px-4 py-2 rounded flex items-center"
              >
                Difficulty
                <ChevronDownIcon className="ml-2" />
              </button>
              {isDifficultyDropdownVisible && (
                <div className="absolute mt-2 w-48 bg-lightgray dark:bg-mediumgray border border-darkgray rounded shadow-lg z-10">
                  {["Easy", "Medium", "Hard"].map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() =>
                        handleDifficultyFilter(
                          selectedDifficulty === difficulty ? null : difficulty
                        )
                      }
                      className={`block w-full text-left px-4 py-2 border-b border-darkgray hover:bg-darkgray ${
                        selectedDifficulty === difficulty
                          ? "bg-gray-200 dark:bg-darkgray"
                          : ""
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              <TableCell className={`text-white ${getColor(problem.difficulty)}`}>
                {problem.difficulty}
              </TableCell>
              <TableCell
                className={
                  problem.solved === "unsolved" ? "font-bold text-white" : "text-white"
                }
              >
                 {problem.solved === "unsolved" ? <ClockIcon className="h-4 w-4 text-gray-500" /> : <CheckIcon className="h-4 w-4 text-green-500" />}
              </TableCell>
              <TableCell className="text-white">{problem.question.substring(0, 20)}...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default McqProblems;