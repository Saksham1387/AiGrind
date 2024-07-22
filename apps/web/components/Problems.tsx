"use client"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { getColor, getProblems } from "../app/db/problem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonTable from './skeletons/problems';

export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  solved: number;
}

const Problems = () => {
  const [Problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await fetch('/api/submission/all').then(res => res.json());
      setProblems(problems);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Coding Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Check out the most popular programming problems on DataDex.
          </p>
        </div>
        <div className="">
       {loading ? <SkeletonTable /> : <ProblemCard problems={Problems} />}
      </div>
      </div>
    </section>
  );
};

function ProblemCard({problems}:any) {

  const router = useRouter();
  const handleRoute = (id:any) => {
    router.push(`/problem/${id}`);
  };
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
          {problems.map((problem:any, index:any) => (
            
              <TableRow className="hover:bg-gray-100 hover:cursor-pointer"
              onClick={()=>{handleRoute(problem.id)}}
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
export default Problems;
