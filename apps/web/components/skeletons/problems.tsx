import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@repo/ui/table";
export const SkeletonTable = () => {
    const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-300 rounded"></div>
        </TableCell>
      </TableRow>
    ));
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Solved</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{skeletonRows}</TableBody>
      </Table>
    );
  };


  import { Button } from "@repo/ui/button";
  import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
  
  export const ProblemSkeleton = () => {
    return (
      <div className="relative min-h-screen w-full bg-white flex flex-col items-center py-10 dark:bg-gray-800">
        <Button className="absolute top-4 left-4 text-lg p-2">
          <ArrowLeftFromLine />
        </Button>
        <Button className="absolute top-4 right-4 text-lg p-2">
          <ArrowRightFromLine />
        </Button>
        <div className="bg-white dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col justify-center">
          <div className="w-full">
            <div className="rounded-md p-1 text-lg">
              <div className="grid grid-cols-2 w-full">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3 mt-5"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="flex flex-col items-center space-y-2 w-full">
              <ul className="space-y-2 w-full">
                {Array(4).fill(0).map((_, index) => (
                  <li key={index} className="w-full">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  </li>
                ))}
              </ul>
              <div className="mt-10"></div>
              <Button className="mt-4 p-3">
                {/* <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" /> */}
              </Button>
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
