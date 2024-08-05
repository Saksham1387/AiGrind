import DashboardProblems from "../../components/DashboardProb";
import { Hero } from "../../components/Hero";
import { getMCQProblems } from "../db/fetches";

export default async function dashboard() {
  const problems = await getMCQProblems();

  return (
    <div className="flex flex-col min-h-screen bg-darkgray w-full overflow-x-hidden">
      <main className="flex-grow">
        <div className="flex flex-col min-h-screen bg-darkgray">
          <main className="">
            <Hero />
            <section className="py-8 md:py-12 w-full">
              <div className="container mx-auto px-4 md:px-6">
                <DashboardProblems problems={problems} />
              </div>
            </section>
          </main>
        </div>
      </main>
    </div>
  );
}
