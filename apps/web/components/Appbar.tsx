"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ModeToggle";
import { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../packages/ui/src/@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";
  const userImage = session?.user?.image;
  const router = useRouter();
  return (
    <header className="bg-black text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <img src="/Main-logo.png" alt="das" className="h-9 w-10" />
        <span className="text-lg font-bold">DataDex</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {/* <Link href="/contests" className="hover:underline" prefetch={false}>
          Contests
        </Link> */}
        <Link href="/problems" className="hover:underline" prefetch={false}>
          Problems
        </Link>
        <Link href="/mcqs" className="hover:underline" prefetch={false}>
          MCQs
        </Link>
        <Link href="/mentors" className="hover:underline" prefetch={false}>
          <Button className="bg-white text-black hover:bg-slate-200">
            1:1 Mentorship
          </Button>
        </Link>
      </nav>

      {!isLoading && session?.user && (
        <div className="flex items-center gap-4">
          <Streak userId={session?.user?.id}></Streak>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userImage ? userImage : "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <button >Logout</button> */}
              <div className="py-3 px-2">
                <p>Email: {session?.user?.email}</p>
                {/* <p>Username: {session?.user?.username}</p> */}
                <p>Name: {session?.user?.name}</p>
                {/* <p>Name: {session?.user?.username}</p> */}
              </div>
              <DropdownMenuLabel
                onClick={() => signOut()}
                className="hover:cursor-pointer hover:bg-slate-600"
              >
                Log Out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {!isLoading && !session?.user && (
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}

      {isLoading && <div className="flex items-center gap-4"></div>}
    </header>
  );
}

function Streak({ userId }: { userId: string }) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await fetch("/api/streak", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data && data.streak && data.streak.currentStreak !== undefined) {
          setCount(data.streak.currentStreak);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch streak:", error);
      }
    };
    fetchStreak();
  }, [router]);
  return (
    <div className="flex flex-row mr-5 ">
      <Button className="bg-black hover:bg-transparent">
        <div>
          <p className="text-xl mt-1 mr-1 text-white">{count}</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-[25px] w-[25px] hover:text-text-primary dark:hover:text-text-primary text-text-secondary dark:text-white"
          >
            <path
              fill-rule="evenodd"
              d="M7.19 1.564a.75.75 0 01.729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 011.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 01.44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 01-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </Button>
    </div>
  );
}
