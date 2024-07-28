import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export function ProblemStatement({ description }: { description: string }) {
  return (
    <div className="prose lg:prose-xl ">
      <Markdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeHighlight]}
      >{description}</Markdown>
    </div>
  );
}
