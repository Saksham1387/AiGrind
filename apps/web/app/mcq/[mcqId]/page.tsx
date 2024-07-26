"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from "@repo/ui/button";
import { CardDescription } from "@repo/ui/card";
import axios from "axios";
import { ArrowLeftFromLine, ArrowRightFromLine, Lightbulb, LightbulbOff } from "lucide-react";
import { McqISubmission } from "../../types/types";
import { McqSubmissionTable } from "../../../components/SubmissionTable";
import { ProblemSkeleton } from "../../../components/skeletons/problems";

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

interface User {
  id: string;
  name?: string;
  email?: string; 
}

export default function MCQ({
  params: { mcqId },
}: {
  params: { mcqId: string };
}) {
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState("mcq");

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

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert("Please select an option.");
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

      if (res.ok) {
        setSubmissionResult(result.message); // Update the result state
        setIsCorrect(result.correct);
        if (result.correct) {
          setShowExplanation(true); // Show explanation if the answer is correct
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

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
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
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center py-10 dark:bg-gray-800">
      <Button
        className="absolute top-4 left-4 text-lg p-2"
        onClick={handlePreviousQuestion}
      >
        <ArrowLeftFromLine></ArrowLeftFromLine>
      </Button>
      <Button
        className="absolute top-4 right-4 text-lg p-2"
        onClick={handleNextQuestion}
      >
        <ArrowRightFromLine></ArrowRightFromLine>
      </Button>
      <div className="bg-white dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col justify-center">
        <div className="w-full">
          <Tabs
            defaultValue="mcq"
            className="rounded-md p-1 text-lg"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full">
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
          <div className="flex flex-row w-full mt-5">
            <div className="w-1/2 p-4 border-r border-gray-300">
              <p className="mb-3 text-xl">{mcq.question}</p>
              <CardDescription className="mb-3 text-xl">
                {mcq.description}
              </CardDescription>
            </div>
            <div className="w-1/2 p-4 flex flex-col items-center">
              <p className="mb-4 text-lg font-bold">Choose options from the following:</p>
              <ul className="space-y-4 w-full">
                {mcq.options.map((option) => (
                  <li key={option.id} className="w-full">
                    <label className="hover:cursor-pointer text-md flex items-center w-full border p-4 rounded-lg shadow-md">
                      <input
                        className="mr-2"
                        type="radio"
                        name="option"
                        value={option.id}
                        onChange={() => setSelectedOption(option.id)}
                      />
                      {option.optionText}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-10 w-full flex justify-center">
                <Button
                  className={`p-3 ${isCorrect === true ? "bg-green-500" : isCorrect === false ? "bg-red-500" : ""
                    }`}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              {submissionResult && (
                <div className="text-lg mt-4 text-center">
                  <p>{submissionResult}</p>
                  {isCorrect === false && (
                    <Button
                      className="mt-2"
                      onClick={handleShowExplanation}
                    >
                      {showExplanation ? (
                        <>
                          <LightbulbOff className="mr-2" />
                          Hide Solution
                        </>
                      ) : (
                        <>
                          <Lightbulb className="mr-2" />
                          Show Solution
                        </>
                      )}
                    </Button>
                  )}
                  {showExplanation && (
                    <div className="border p-4 rounded-lg shadow-md mt-4">
                      <p className="text-md font-bold">Correct Answer:</p>
                      <p className="text-md">{mcq.correctAnswer}</p>
                      <p className="text-md font-bold mt-2">Explanation:</p>
                      <p className="text-md">{mcq.explanation}</p>
                    </div>
                  )}
                </div>
              )}
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

// function getNextMcqId(currentMcqId) {
//   // Logic to get the next question ID
// }

// function getPreviousMcqId(currentMcqId) {
//   // Logic to get the previous question ID
// }