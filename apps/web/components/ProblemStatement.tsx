"use client";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Lightbulb, LightbulbOff } from "lucide-react";

export function ProblemStatement({ description, solution }: any) {
  const [showSolution, setShowSolution] = useState(false);
  const [copyText, setCopyText] = useState("");
  const [showCopyText, setShowCopyText] = useState(false);

  const handleCopy = () => {
    const solutionLines = solution.split("\n");
    const solutionWithoutFirstLine = solutionLines.slice(1).join("\n");

    navigator.clipboard
      .writeText(solutionWithoutFirstLine)
      .then(() => {
        setCopyText("Solution copied!");
        setShowCopyText(true);
        setTimeout(() => setShowCopyText(false), 2000); // Hide text after 2 seconds
      })
      .catch((err) => {
        setCopyText("Failed to copy!");
        console.error("Error copying solution: ", err);
        setShowCopyText(true);
        setTimeout(() => setShowCopyText(false), 2000); // Hide text after 2 seconds
      });
  };

  useEffect(() => {
    if (!showCopyText) {
      const timer = setTimeout(() => setCopyText(""), 500); // Clear text after fade-out transition
      return () => clearTimeout(timer);
    }
  }, [showCopyText]);

  return (
    <div className="lg:prose-xl text-white w-full mb-20">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        className="prose-invert"
      >
        {description}
      </Markdown>
      <div className="mt-4">
        <button
          onClick={() => setShowSolution((prev) => !prev)}
          className="bg-gradient-to-r from-green-400 to-green-700 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-green-800 flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          {showSolution ? (
            <LightbulbOff className="mr-2" />
          ) : (
            <Lightbulb className="mr-2" />
          )}
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showSolution && (
          <div className="mt-4">
            <h2 className="text-2xl text-white flex items-center">
              Solution
              <button
                onClick={handleCopy}
                className="ml-2 p-1 rounded hover:bg-transparent"
                title="Copy to clipboard"
              >
                <Copy className="text-white" />
              </button>
              <span
                className={`ml-2 text-sm text-green-500 transition-opacity duration-500 ${showCopyText ? "opacity-100" : "opacity-0"}`}
              >
                {copyText}
              </span>
            </h2>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              className="prose-invert"
            >
              {solution}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
