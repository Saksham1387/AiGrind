import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export function ProblemStatement({ description }: { description: string }) {
  return (
    <div className="lg:prose-xl text-white">
      <Markdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeHighlight]}
      className={"prose-invert"}
      >{description}</Markdown>
    </div>
  );
}
