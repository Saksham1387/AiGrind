"use client"
import { useSession } from "next-auth/react";
import HomePage from "../components/Home/HomePage";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  if(session){
    router.push("/dashboard")
  }
  return (
    <main>
      <HomePage />
    </main>
  );
}

export const dynamic = "force-dynamic"

