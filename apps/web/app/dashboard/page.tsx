
"use client";
import { useState, useEffect } from "react";
import { Hero } from "../../components/Hero";
import DashboardProblems from "../../components/DashboardProb";
import {SkeletonHero} from "../../components/skeletons/dashboard";
import { ProblemSkeleton, SkeletonTable } from "../../components/skeletons/problems";
import { Landing } from "../../components/Landing";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function dashboard() {
  const [loading, setLoading] = useState(true);
  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();

  useEffect(() => {
    // Simulate a loading period
    if(!session){
        router.push("/")
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-darkgray">
      <main>
        {loading ? (
          <>
            <SkeletonHero />
            <section className="py-8 md:py-12 w-full">
              <div className="container mx-auto px-4 md:px-6">
                <SkeletonTable></SkeletonTable>
              </div>
            </section>
          </>
        ) : (
          <Landing></Landing>
        )}
      </main>
    </div>
  );
}
export default dashboard