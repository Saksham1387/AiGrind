
import { get } from "http";
import { Landing } from "../components/Landing";
import styles from "./page.module.css";
import { getMCQProblems, getProblems } from "./db/problem";

export default function Page(): JSX.Element {
  
  return (
    <main>
      <Landing />
    </main>
  );
}

export const dynamic = "force-dynamic"
