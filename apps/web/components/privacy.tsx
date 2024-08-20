import React, { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";


export default function Privacy({markdownContent}:any){

    return(
        <div className="text-md p-3">
            <h1 className="text-2xl font-bold mb-3">PRIVACY POLICY</h1>
            <Markdown remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}  className="prose-invert">{markdownContent}</Markdown>
        </div>
    )
}