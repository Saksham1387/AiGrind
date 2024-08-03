"use client"
import { useSession } from "next-auth/react";
import HomePage from "../components/Home/HomePage";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {

  return (
    <main>
      <HomePage />
    </main>
  );
}

export const dynamic = "force-dynamic"