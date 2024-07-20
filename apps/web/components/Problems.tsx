import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { getColor, getProblems } from "../app/db/problem";

const Problems = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Check out the most popular programming problems on DataDex.
          </p>
        </div>
        <div className="">
        <ProblemCard/>
      </div>
      </div>
    </section>
  );
};

async function ProblemCard() {
  const problems = await getProblems();
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
          {problems.map((problem, index) => (
            
              <TableRow className="hover:bg-gray-100">
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
