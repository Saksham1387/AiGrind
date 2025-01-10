"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from "@repo/ui/button";
import { CardDescription } from "@repo/ui/card";
import axios from "axios";
import "katex/dist/katex.min.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/accordion";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { McqISubmission } from "../../types/types";
import { McqSubmissionTable } from "../../../components/SubmissionTable";
import { ProblemSkeleton } from "../../../components/skeletons/problems";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import "katex/dist/katex.min.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type MCQOption = {
  id: string;
  optionText: string;
};
type MCQProblem = {
  id: string;
  question: string;
  description: string;
  options: MCQOption[];
  explanation: string;
  correctAnswer: string;
};

export default function MCQ({
  params: { mcqId },
}: {
  params: { mcqId: string };
}) {
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("mcq");
  const [showExplanation, setShowExplanation] = useState(false);
  const [mcqIds, setMcqIds] = useState<string[]>([]);
  const session = useSession();
  const router = useRouter();

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    setSubmissionResult(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    if (mcqId) {
      async function fetchMcq() {
        const res = await fetch(`/api/mcqs/${mcqId}`);
        const data = await res.json();
        setMcq(data);
      }
      fetchMcq();
    }
  }, [mcqId]);

  useEffect(() => {
    if (mcqId) {
      async function fetchMcqid() {
        const res = await fetch(`/api/mcqs/all`);
        const data = await res.json();
        setMcqIds(data.mcqs.map((mcq: any) => mcq.id));
      }
      fetchMcqid();
    }
  }, [mcqId]);

  const handleSubmit = async () => {
    if (!session.data?.user) {
      toast.error("Login to submit");
      router.push("/signin");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }
    try {
      const res = await fetch(`/api/mcqs/${mcqId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedOptionId: selectedOption,
        }),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        setSubmissionResult(result.message); // Update the result state
        setIsCorrect(result.isCorrect);
        // Update the isCorrect state
        if (result.isCorrect) {
          setShowExplanation(true);
          toast.success("Correct!"); // Show explanation if the answer is correct
        } else {
          toast.error("Incorrect :(");
        }
      } else {
        setSubmissionResult(result.error || "Submission failed.");

        setIsCorrect(false);
      }
    } catch (error) {
      console.error(error);
      setSubmissionResult("An error occurred.");
      setIsCorrect(false);
    }
  };

  const getNextMcqId = (currentMcqId: any) => {
    const currentIndex = mcqIds.indexOf(currentMcqId);
    const nextIndex = (currentIndex + 1) % mcqIds.length; // Loop back to the start
    return mcqIds[nextIndex];
  };

  const getPreviousMcqId = (currentMcqId: any) => {
    const currentIndex = mcqIds.indexOf(currentMcqId);
    const previousIndex = (currentIndex - 1 + mcqIds.length) % mcqIds.length; // Loop back to the end
    return mcqIds[previousIndex];
  };

  const handleNextQuestion = () => {
    const nextMcqId = getNextMcqId(mcqId);
    window.location.href = `/mcq/${nextMcqId}`;
  };

  const handlePreviousQuestion = () => {
    const previousMcqId = getPreviousMcqId(mcqId);
    window.location.href = `/mcq/${previousMcqId}`;
  };

  if (!mcq)
    return (
      <div>
        <ProblemSkeleton></ProblemSkeleton>
      </div>
    );

  return (
    <div className="text-white relative min-h-screen w-full bg-darkgray flex flex-col items-center py-10 dark:bg-gray-800">
      <Button
        className="absolute top-4 left-4 text-lg p-2 bg-lightgray hover:bg-lightgray"
        onClick={handlePreviousQuestion}
        title="Previous Question"
      >
        <ArrowLeftFromLine></ArrowLeftFromLine>
      </Button>
      <Button
        className="absolute top-4 right-4 text-lg p-2 bg-lightgray hover:bg-lightgray"
        onClick={handleNextQuestion}
        title="Next Question"
      >
        <ArrowRightFromLine />
      </Button>
      <div className="bg-lightgray dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col justify-center mt-10 md:mt-0">
        <div className="w-full ">
          <Tabs
            defaultValue="mcq"
            className="rounded-md p-1 text-lg bg-darkgray"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full bg-darkgray">
              <TabsTrigger className="" value="mcq">
                MCQ
              </TabsTrigger>
              <TabsTrigger className="" value="submissions">
                Submissions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {activeTab === "mcq" && (
          // Left Side
          <div className="flex flex-col md:flex-row w-full mt-5 ">
            <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                className="prose prose-invert"
              >
                {mcq.question}
              </Markdown>
<div></div>
<div></div>
              <CardDescription className="mb-3 text-xl">
                {mcq.description}
              </CardDescription>
              <div>
                {submissionResult && (
                  <div className="text-lg mt-4 text-center flex flex-col">
                    {isCorrect !== null && (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Explanation</AccordionTrigger>
                          <AccordionContent className="text-center">
                            {mcq.explanation}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Right Side */}
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
              <p className="mb-4 text-lg font-bold">
                Choose from the following options
              </p>
              <ul className="space-y-4 w-full ">
                {mcq.options.map((option) => (
                  <li key={option.id} className="w-full ">
                    <label
                      className={`hover:cursor-pointer text-md flex items-center w-full border p-4 rounded-lg shadow-md
        ${
          selectedOption === option.id
            ? isCorrect === null
              ? "bg-mediumgray"
              : isCorrect && option.id === mcq.correctAnswer
                ? "border-green-500"
                : !isCorrect && selectedOption === option.id
                  ? "border-red-400"
                  : "border-green-400"
            : "hover:bg-mediumgray"
        }`}
                    >
                      <input
                        className="mr-2 bg-slate-800"
                        type="radio"
                        name="option"
                        value={option.id}
                        onChange={() => handleOptionChange(option.id)}
                      />
                      {option.optionText}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-10 w-full flex justify-center">
                <Button
                  className="p-3 bg-white text-black hover:bg-white"
                  onClick={handleSubmit}
                >
                  {session.data?.user ? "Submit" : "Login to Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="flex justify-center w-full">
            <Submissions mcqId={mcqId} />
          </div>
        )}
      </div>
    </div>
  );
}

function Submissions({ mcqId }: { mcqId: string }) {
  const [submissions, setSubmissions] = useState<McqISubmission[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/mcqs/bulk?mcqId=${mcqId}`);
      console.log(response.data);
      setSubmissions(response.data.submissions || []);
    };
    fetchData();
  }, [mcqId]);

  console.log(submissions);

  return (
    <div>
      <McqSubmissionTable submissions={submissions} />
    </div>
  );
}
