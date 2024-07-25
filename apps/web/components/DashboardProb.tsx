// "use client";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@repo/ui/table";
// import { getColor } from "../app/db/problem";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   ChevronDownIcon,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { MCQProblem, Problem } from "../app/types/types";

// import { Button } from "@repo/ui/button";
// import { SkeletonTable } from "./skeletons/problems";

// const DashboardProblems = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [mcqProblems, setMcqProblems] = useState<MCQProblem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
//   const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
//     useState(false);
//   const [sortOrder, setSortOrder] = useState<
//     "default" | "hard-to-easy" | "easy-to-hard"
//   >("default");
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();
//   const ITEMS_PER_PAGE = 10;
//   const categories = [
//     "NLP",
//     "Reinforcement Learning",
//     "Deep Learning",
//     "Machine Learning",
//     "Linear Algebra",
//     "Generative AI",
//   ];

//   useEffect(() => {
//     const fetchProblems = async () => {
//       const problems = await fetch("/api/submission/all").then((res) =>
//         res.json()
//       );
//       setProblems(problems);
//       setLoading(false);
//     };
//     fetchProblems();

//     const fetchMcqProblems = async () => {
//       const mcqProblems = await fetch("/api/mcqs").then((res) => res.json());
//       setMcqProblems(mcqProblems);
//       setLoading(false);
//     };
//     fetchMcqProblems();
//   }, []);

//   const filteredProblems = mcqProblems.filter((problem) => {
//     if (selectedStatus && problem.solved !== selectedStatus) return false;
//     if (
//       selectedCategories.length > 0 &&
//       !selectedCategories.includes(problem.category || "")
//     )
//       return false;
//     return true;
//   });

//   const handleStatusFilter = (status: string | null) => {
//     setSelectedStatus(status);
//     setIsStatusDropdownVisible(false);
//   };

//   const handleCategoryFilter = (category: string) => {
//     setSelectedCategories((prevCategories) =>
//       prevCategories.includes(category)
//         ? prevCategories.filter((c) => c !== category)
//         : [...prevCategories, category]
//     );
//   };

//   const toggleStatusDropdown = () => {
//     setIsStatusDropdownVisible(!isStatusDropdownVisible);
//     setIsCategoryDropdownVisible(false);
//   };

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
//     setIsStatusDropdownVisible(false);
//   };

//   const sortedProblems = () => {
//     if (sortOrder === "default") return filteredProblems;

//     const difficulties = ["Easy", "Medium", "Hard"];
//     return filteredProblems.slice().sort((a, b) => {
//       if (sortOrder === "hard-to-easy") {
//         return (
//           difficulties.indexOf(b.difficulty) -
//           difficulties.indexOf(a.difficulty)
//         );
//       } else {
//         return (
//           difficulties.indexOf(a.difficulty) -
//           difficulties.indexOf(b.difficulty)
//         );
//       }
//     });
//   };

//   const indexOfLastProblem = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstProblem = indexOfLastProblem - ITEMS_PER_PAGE;
//   const currentProblems = mcqProblems.slice(
//     indexOfFirstProblem,
//     indexOfLastProblem
//   );

//   // Calculate total pages
//   const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);

//   const handleRoute = (id: string) => {
//     router.push(`/problem/${id}`);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-2">TOP 20 !</h2>
//           <p className="text-gray-500 dark:text-gray-400 mb-3">
//             Check out the most popular 20 Questions asked in the ML Interviews.
//           </p>
//           <div className="flex justify-center gap-16 mb-8">
//             <div className="relative">
//               <button
//                 onClick={toggleStatusDropdown}
//                 className="bg-neutral-800 text-white px-4 py-2 rounded flex items-center"
//               >
//                 Status
//                 <ChevronDownIcon className="ml-2" />
//               </button>
//               {isStatusDropdownVisible && (
//                 <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
//                   <button
//                     onClick={() => handleStatusFilter(null)}
//                     className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     All
//                   </button>
//                   <button
//                     onClick={() => handleStatusFilter("solved")}
//                     className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Solved
//                   </button>
//                   <button
//                     onClick={() => handleStatusFilter("unsolved")}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Unsolved
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="relative">
//               <button
//                 onClick={toggleCategoryDropdown}
//                 className="bg-neutral-800 text-white px-4 py-2 rounded flex items-center"
//               >
//                 Category
//                 <ChevronDownIcon className="ml-2" />
//               </button>
//               {isCategoryDropdownVisible && (
//                 <div className="absolute mt-2 w-[450px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10 p-4 grid grid-cols-3 gap-4">
//                   {categories.map((category) => (
//                     <label
//                       key={category}
//                       className="flex items-center text-left"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedCategories.includes(category)}
//                         onChange={() => handleCategoryFilter(category)}
//                         className="mr-2 accent-green-500"
//                       />
//                       <span className="ml-2">{category}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div
//           className={`${isStatusDropdownVisible || isCategoryDropdownVisible ? "mt-44" : ""}`}
//         >
//           {loading ? (
//             <SkeletonTable />
//           ) : (
//             <div>
//               <ProblemCard
//                 problems={problems}
//                 mcqProblems={sortedProblems()}
//                 sortOrder={sortOrder}
//                 setSortOrder={setSortOrder}
//               />
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// const ProblemCard = ({
//   problems,
//   mcqProblems,
//   sortOrder,
//   setSortOrder,
// }: {
//   problems: Problem[];
//   mcqProblems: MCQProblem[];
//   sortOrder: string;
//   setSortOrder: any;
// }) => {
//   const router = useRouter();

//   const handleRoute = (id: string) => {
//     router.push(`/problem/${id}`);
//   };

//   const handleSort = () => {
//     //@ts-ignore
//     setSortOrder((prevOrder) => {
//       if (prevOrder === "default") return "hard-to-easy";
//       if (prevOrder === "hard-to-easy") return "easy-to-hard";
//       return "default";
//     });
//   };

//   const combinedProblems = [...problems, ...mcqProblems];
//   const shuffledProblems = shuffleArray(combinedProblems);

//   return (
//     <div className="">
//       <Table>
//         <TableHeader>
//           <TableRow className="hover:bg-white">
//             <TableHead>S.No</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead
//               onClick={handleSort}
//               className="cursor-pointer flex items-center"
//             >
//               Difficulty
//               <div className="flex flex-col ml-2">
//                 <ChevronUp
//                   size={12}
//                   className={
//                     sortOrder === "easy-to-hard"
//                       ? "text-black"
//                       : "text-gray-500"
//                   }
//                 />
//                 <ChevronDown
//                   size={12}
//                   className={
//                     sortOrder === "hard-to-easy"
//                       ? "text-black"
//                       : "text-gray-500"
//                   }
//                 />
//               </div>
//             </TableHead>
//             <TableHead>Submissions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {shuffledProblems.map((problem: any, index: any) => (
//             <TableRow
//               className="hover:bg-gray-100 hover:cursor-pointer"
//               key={problem.id}
//               onClick={() => {
//                 handleRoute(problem.id);
//               }}
//             >
//               <TableCell>{index + 1}</TableCell>
//               <TableCell>{problem.title}</TableCell>
//               <TableCell className={getColor(problem.difficulty)}>
//                 {problem.difficulty}
//               </TableCell>
//               <TableCell>{problem.solved}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// function shuffleArray(array: any[]) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }) {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   return (
//     <div className="flex justify-center mt-8">
//       <Button
//         onClick={handlePrevious}
//         disabled={currentPage === 1}
//         className="mr-3 bg-transparent text-white hover:bg-slate-700"
//       >
//         <ChevronLeft></ChevronLeft>
//         Previous
//       </Button>
//       <span className="text-gray-700 dark:text-gray-300 mt-2">
//         {currentPage} of {totalPages}
//       </span>
//       <Button
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//         className="ml-3 bg-transparent text-white hover:bg-slate-700 "
//       >
//         Next
//         <ChevronRight></ChevronRight>
//       </Button>
//     </div>
//   );
// }

// export default DashboardProblems;

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
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MCQProblem, Problem } from "../app/types/types";

import { Button } from "@repo/ui/button";
import { SkeletonTable } from "./skeletons/problems";

const DashboardProblems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<
    "default" | "hard-to-easy" | "easy-to-hard"
  >("default");
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await fetch("/api/submission/all").then((res) =>
        res.json()
      );
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
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">TOP 20 !</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
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
    router.push(`/problem/${id}`);
  };

  const handleSort = () => {
    setSortOrder((prevOrder:any) => {
      if (prevOrder === "default") return "hard-to-easy";
      if (prevOrder === "hard-to-easy") return "easy-to-hard";
      return "default";
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead
              onClick={handleSort}
              className="cursor-pointer flex items-center"
            >
              Difficulty
              <div className="flex flex-col ml-2">
                <ChevronUp
                  size={12}
                  className={
                    sortOrder === "easy-to-hard"
                      ? "text-black"
                      : "text-gray-500"
                  }
                />
                <ChevronDown
                  size={12}
                  className={
                    sortOrder === "hard-to-easy"
                      ? "text-black"
                      : "text-gray-500"
                  }
                />
              </div>
            </TableHead>
            <TableHead>Submissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem: any, index: any) => (
            <TableRow
              className="hover:bg-gray-100 hover:cursor-pointer"
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
              <TableCell>{problem.solved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardProblems;