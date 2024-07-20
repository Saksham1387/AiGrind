import Link from "next/link";
import { Piechart } from "./PieChart";

export function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to DataDex
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              DataDex is a platform for holding programming contests.
              Participate in challenges, solve problems, and climb the
              leaderboard.
            </p>
            <Piechart></Piechart>
          </div>
         
        </div>
      </div>
    </section>
  );
}
