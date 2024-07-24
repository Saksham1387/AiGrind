"use client"
import { useSession } from "next-auth/react";
import { Landing } from "../components/Landing";
import HomePage from "../components/Home/HomePage";

export default function Page(): JSX.Element {
  const { data: session, status: sessionStatus } = useSession();
  if(!session){
    return <HomePage />
  }
  return (
    <main>
      <Landing />
    </main>
  );
}

export const dynamic = "force-dynamic"
