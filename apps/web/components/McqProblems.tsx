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
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { MCQProblem } from "../app/types/types";
import { Button } from "@repo/ui/button";
import { SkeletonTable } from "./skeletons/problems";

const SORT_ORDER = {
  DEFAULT: "default",
  HARD_TO_EASY: "hard-to-easy",
  EASY_TO_HARD: "easy-to-hard",
};

const categories = [
  "NLP",
  "Reinforcement Learning",
  "Deep Learning",
  "Machine Learning",
  "Linear Algebra",
  "Generative AI",
];

const ITEMS_PER_PAGE = 20;

const McqProblems = () => {
  const [mcqProblems, setMcqProblems] = useState<MCQProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const [isDifficultyDropdownVisible, setIsDifficultyDropdownVisible] =
    useState(false);
  const [sortOrder, setSortOrder] =
    useState<keyof typeof SORT_ORDER>("DEFAULT");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await fetch("/api/mcqs").then((res) => res.json());
      setMcqProblems(problems);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    return mcqProblems.filter((problem) => {
      if (selectedStatus && problem.solved !== selectedStatus) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(problem.category || "")
      )
        return false;
      return true;
    });
  }, [mcqProblems, selectedStatus, selectedCategories]);

  const shuffledProblems = useMemo(() => {
    const shuffled = [...filteredProblems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [filteredProblems]);

  const sortedProblems = useMemo(() => {
    const difficulties = ["Easy", "Medium", "Hard"];
    return shuffledProblems.slice().sort((a, b) => {
      if (sortOrder === SORT_ORDER.HARD_TO_EASY) {
        return (
          difficulties.indexOf(b.difficulty) -
          difficulties.indexOf(a.difficulty)
        );
      } else if (sortOrder === SORT_ORDER.EASY_TO_HARD) {
        return (
          difficulties.indexOf(a.difficulty) -
          difficulties.indexOf(b.difficulty)
        );
      }
      return 0;
    });
  }, [shuffledProblems, sortOrder]);

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedProblems.slice(startIndex, endIndex);
  }, [sortedProblems, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(sortedProblems.length / ITEMS_PER_PAGE),
    [sortedProblems]
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

  const handleSortOrder = (order: keyof typeof SORT_ORDER) => {
    setSortOrder(order);
    setIsDifficultyDropdownVisible(false);
    setCurrentPage(1); // Reset to first page on sort change
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
    <section className="bg-white dark:bg-black py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">MCQ Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Here are some of the popular problems asked in the interviews.
          </p>
          <div className="flex justify-center gap-16 mb-8">
            <div className="relative">
              <button
                onClick={toggleStatusDropdown}
                className="bg-neutral-800 text-white px-4 py-2 rounded flex items-center"
              >
                Status
                <ChevronDownIcon className="ml-2" />
              </button>
              {isStatusDropdownVisible && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                  <button
                    onClick={() => handleStatusFilter(null)}
                    className="block w-full text-left px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleStatusFilter("solved")}
                    className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Solved
                  </button>
                  <button
                    onClick={() => handleStatusFilter("unsolved")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Unsolved
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className="bg-neutral-800 text-white px-4 py-2 rounded flex items-center"
              >
                Category
                <ChevronDownIcon className="ml-2" />
              </button>
              {isCategoryDropdownVisible && (
                <div className="absolute mt-2 w-[450px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10 p-4 grid grid-cols-3 gap-4">
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
                className="bg-neutral-800 text-white px-4 py-2 rounded flex items-center"
              >
                Difficulty
                <ChevronDownIcon className="ml-2" />
              </button>
              {isDifficultyDropdownVisible && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                  <button
                    onClick={() => handleSortOrder(SORT_ORDER.DEFAULT)}
                    className="block w-full text-left px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
                  >
                    Default
                  </button>
                  <button
                    onClick={() => handleSortOrder(SORT_ORDER.HARD_TO_EASY)}
                    className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Hard to Easy
                  </button>
                  <button
                    onClick={() => handleSortOrder(SORT_ORDER.EASY_TO_HARD)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Easy to Hard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${isStatusDropdownVisible || isCategoryDropdownVisible || isDifficultyDropdownVisible ? "mt-44" : ""}`}
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
            className="mr-3 bg-transparent text-black hover:bg-slate-700"
          >
            <ChevronLeft></ChevronLeft>
            Previous
          </Button>
          <span className="text-gray-700 dark:text-gray-300 mt-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-3 bg-transparent text-black hover:bg-slate-700 "
          >
            Next
            <ChevronRight></ChevronRight>
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
    <div className="">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white dark:hover:bg-black">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Question</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mcqProblems.map((problem: any, index: any) => (
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
