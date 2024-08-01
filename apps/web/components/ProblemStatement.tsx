"use client";
import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy } from 'lucide-react';

export function ProblemStatement({ description, solution }: { description: string; solution: string }) {
  const [showSolution, setShowSolution] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(solution)
      .then(() => {
        alert('Solution copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy solution!');
        console.error('Error copying solution: ', err);
      });
  };

  return (
    <div className="lg:prose-xl text-white w-full mb-20">
      <Markdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
        className={"prose-invert"}
      >
        {description}
      </Markdown>
      <div className="mt-4">
        <button 
          onClick={() => setShowSolution(prev => !prev)} 
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
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
                <Copy className="text-white " />
              </button>
            </h2>
            <Markdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeHighlight]}
              className={"prose-invert"}
            >
              {solution}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
}