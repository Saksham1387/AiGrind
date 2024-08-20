
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import Privacy from "../../components/privacy";

export default function privacy() {
    
    const filePath = path.join(process.cwd(), './app/privacy-policy/privacy-policy.md');
    const content = fs.readFileSync(filePath, 'utf-8');


  return (
    <div>
      <Privacy markdownContent={content}></Privacy>
    </div>
  );
}
