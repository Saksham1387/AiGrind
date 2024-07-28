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
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { CardDescription } from "@repo/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/accordion";
  
  export const ProblemSkeleton = () => {
    return (
      <div className="text-white relative min-h-screen w-full bg-darkgray flex flex-col items-center py-10 dark:bg-gray-800">
      <Button className="absolute top-4 left-4 text-lg p-2" disabled>
        <ArrowLeftFromLine />
      </Button>
      <Button className="absolute top-4 right-4 text-lg p-2" disabled>
        <ArrowRightFromLine />
      </Button>
      <div className="bg-lightgray dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col justify-center">
        <div className="w-full">
          <Tabs defaultValue="mcq" className="rounded-md p-1 text-lg bg-darkgray">
            <TabsList className="grid grid-cols-2 w-full bg-darkgray">
              <TabsTrigger className="" value="mcq" disabled>
                MCQ
              </TabsTrigger>
              <TabsTrigger className="" value="submissions" disabled>
                Submissions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="w-1/2 p-4 border-r border-gray-300">
            <div className="mb-3 text-xl bg-gray-500 rounded-md h-8 w-3/4 animate-pulse"></div>
            <CardDescription className="mb-3 text-xl bg-gray-500 rounded-md h-6 w-3/4 animate-pulse"></CardDescription>
           
          </div>
          <div className="w-1/2 p-4 flex flex-col items-center">
            <p className="mb-4 text-lg font-bold bg-gray-500 rounded-md h-6 w-3/4 animate-pulse"></p>
            <ul className="space-y-4 w-full">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index} className="w-full bg-gray-500 rounded-lg h-12 animate-pulse"></li>
              ))}
            </ul>
            <div className="mt-10 w-full flex justify-center">
              <Button className="p-3 bg-gray-500 rounded-md w-32 h-12 animate-pulse" disabled>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
