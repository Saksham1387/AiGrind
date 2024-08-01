import McqProblems from "../../components/McqProblems";
import { getMCQProblems } from "../db/fetches";

export default async function McqProblem() {
  const Mcqproblems: any = await getMCQProblems();
  console.log(Mcqproblems);

  return (
    <main>
      <McqProblems mcqProblems={Mcqproblems} />
    </main>
  );
}

export const dynamic = "force-dynamic";
