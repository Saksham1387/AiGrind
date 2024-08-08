"use client"
import { useSession } from "next-auth/react";
import HomePage from "../components/Home-Page/HomePage";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  if(session){
    router.push("/dashboard");
  }
  return (
    <main>
      <HomePage />
    </main>
  );
}

export const dynamic = "force-dynamic"