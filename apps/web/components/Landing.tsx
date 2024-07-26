import { Hero } from "./Hero";
import DashboardProblems from "./DashboardProb";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-darkgray">
    <main className="">
      <Hero />
      <section className=" py-8 md:py-12 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <DashboardProblems />
        </div>
      </section>
    </main>
  </div>
  );
}
