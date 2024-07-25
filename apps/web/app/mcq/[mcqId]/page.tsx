"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from "@repo/ui/button";
import { CardTitle, CardDescription } from "@repo/ui/card";
import axios from "axios";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
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
};

interface User {
  id: string;
  name?: string; // Optional property if you have user's name
  email?: string; // Optional property if you have user's email
}

export default function MCQ({
  params: { mcqId },
}: {
  params: { mcqId: string };
}) {
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
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
      } else {
        setSubmissionResult(result.error || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      setSubmissionResult("An error occurred.");
    }
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
        onClick={() => console.log("Previous")}
      >
        <ArrowLeftFromLine></ArrowLeftFromLine>
      </Button>
      <Button
        className="absolute top-4 right-4 text-lg p-2"
        onClick={() => console.log("Next")}
      >
        <ArrowRightFromLine></ArrowRightFromLine>
      </Button>
      <div className="bg-white dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col   justify-center">
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
          <div className="flex flex-col items-center w-full">
            <CardTitle className="mb-3 mt-5 text-2xl">{mcq.question}</CardTitle>
            <CardDescription className="mb-3 text-xl">
              {mcq.description}
            </CardDescription>
            <div className="flex flex-col items-center space-y-2 w-full">
              <ul className="space-y-2 w-full">
                {mcq.options.map((option) => (
                  <li key={option.id} className="w-full">
                    <label className="hover:cursor-pointer text-lg flex items-center w-full">
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
              <div className="mt-10"></div>
              <Button className="mt-4 p-3" onClick={handleSubmit}>
                Submit
              </Button>
              {submissionResult && (
                <p className="text-lg mt-4">
                  {submissionResult}
                  <p className="text-md">Explanation: {mcq.explanation}</p>
                </p>
              )}{" "}
              {/* Display result message */}
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
