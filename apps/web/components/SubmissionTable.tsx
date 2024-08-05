/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pxkBLMqmzHi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { CheckIcon, ClockIcon, CircleX } from "lucide-react";
import { ISubmission, McqISubmission } from "../app/types/types";

function getColor(status: string) {
  switch (status) {
    case "AC":
      return "text-green-500";
    case "FAIL":
      return "text-red-500";
    case "true":
      return "text-green-500";
    case "false":
      return "text-red-500";
    case "TLE":
      return "text-red-500";
    case "COMPILATION_ERROR":
      return "text-red-500";
    case "PENDING":
      return "text-yellow-500";
    case "REJECTED":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

function getIcon(status: string) {
  switch (status) {
    case "AC":
      return <CheckIcon className="h-4 w-4" />;
    case "false":
      return <CircleX className="h-4 w-4" />;
    case "true":
      return <CheckIcon className="h-4 w-4" />;
    case "FAIL":
      return <CircleX className="h-4 w-4" />;
    case "REJECTED":
      return <CircleX className="h-4 w-4" />;
    case "TLE":
      return <ClockIcon className="h-4 w-4" />;
    case "COMPILATION_ERROR":
      return <CircleX className="h-4 w-4" />;
    case "PENDING":
      return <ClockIcon className="h-4 w-4" />;
    default:
      return <ClockIcon className="h-4 w-4" />;
  }
}

export function SubmissionTable({
  submissions,
}: {
  submissions: ISubmission[];
}) {
  return (
    <div className="overflow-x-auto">
    <Table className="min-w-full text-[10px] md:text-sm">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="px-2 py-1 md:px-4 md:py-2">Submission ID</TableHead>
          <TableHead className="px-2 py-1 md:px-4 md:py-2">Result</TableHead>
          <TableHead className="px-2 py-1 md:px-4 md:py-2">Tests Passed</TableHead>
          <TableHead className="px-2 py-1 md:px-4 md:py-2">Time</TableHead>
          <TableHead className="px-2 py-1 md:px-4 md:py-2">Memory</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">
              {submission.id.substr(0, 8)}
            </TableCell>
            <TableCell className={`border-t border-darkgray px-2 py-1 md:px-4 md:py-4 ${getColor(submission.status)}`}>
              {getIcon(submission.status)}
            </TableCell>
            <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">
              {
                submission.testcases.filter(
                  (testcase) => testcase.status === "AC"
                ).length
              }
              /{submission.testcases.length}
            </TableCell>
            <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">
              <span className="block md:hidden">
                {submission.time.substr(0, submission.time.length / 2)}
              </span>
              <span className="hidden md:block">
                {submission.time}
              </span>
            </TableCell>
            <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">
              <span className="block md:hidden">
                {submission.memory.substr(0, submission.memory.length / 2)}
              </span>
              <span className="hidden md:block">
                {submission.memory}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  );
}

export function McqSubmissionTable({
  submissions,
}: {
  submissions: McqISubmission[];
}) {
  return (
    <div className="overflow-x-auto">
  <Table className="min-w-full text-[10px] md:text-sm">
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="px-2 py-1 md:px-4 md:py-3">Submission ID</TableHead>
        <TableHead className="px-2 py-1 md:px-4 md:py-2">User Email</TableHead>
        <TableHead className="px-2 py-1 md:px-4 md:py-2">Selected Option</TableHead>
        <TableHead className="px-2 py-1 md:px-4 md:py-2">Result</TableHead>
        <TableHead className="px-2 py-1 md:px-4 md:py-2">Created At</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {submissions.map((submission) => (
        <TableRow key={submission.id}>
          <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">{submission.id.substr(0, 8)}</TableCell>
          <TableCell className={`border-t border-darkgray px-2 py-1 md:px-4 md:py-4 ${getColor(submission.user.email)}`}>
            {submission.user.email}
          </TableCell>
          <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">{submission.selectedOption.optionText}</TableCell>
          <TableCell className={`border-t border-darkgray px-2 py-1 md:px-4 md:py-4 ${getColor(submission.result)}`}>
            {getIcon(submission.result)}
          </TableCell>
          <TableCell className="border-t border-darkgray px-2 py-1 md:px-4 md:py-4">
            <span className="block md:hidden">
              {submission.createdAt.substr(0, submission.createdAt.length / 2)}
            </span>
            <span className="hidden md:block">
              {submission.createdAt}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
  );
}
