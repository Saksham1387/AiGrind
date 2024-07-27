import  Problems  from "../../components/Problems";
import { getProblems } from "../db/problem";

export default async function Problem() {
  const problems:any = await getProblems();
  return (
    <main>
      <Problems  problems={problems}/>
    </main>
  );
}

export const dynamic = "force-dynamic"