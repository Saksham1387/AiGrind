"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../packages/ui/src/@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
  
export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === "loading";
  const userImage = session?.user?.image;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 bg-mediumgray text-white  md:px-6 py-3 flex items-center justify-between border-b-1 z-50 ">
      <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
        <img src="/Main-logo.png" alt="AIgrind" className="h-9 w-10 mb-2" />
        <div className="flex flex-row">
        <span className="text-lg font-bold ">AIgrind</span>
        <p className="text-[10px] mt-5">BETA</p>
        </div>
        {/* <img src="/beta-icon.png" alt="beta-release" className="h-6 w-6" /> */}
      </Link>

      {/* Navigation links for normal screens */}
      <nav className="hidden md:flex flex-1 justify-center items-center">
        <Link
          href="/problems"
          className="hover:bg-lightgray p-3 rounded-lg mx-3"
          prefetch={false}
        >
          Problems
        </Link>
        <Link
          href="/mcqs"
          className="hover:bg-lightgray p-3 rounded-lg mx-3"
          prefetch={false}
        >
          MCQs
        </Link>
        <Link href="/mentors" className="" prefetch={false}>
          <Button className="bg-white text-black hover:bg-slate-200">
            1:1 Mentorship
          </Button>
        </Link>
      </nav>

      {/* Streak and profile picture for normal screens */}
      <div className="hidden md:flex items-center gap-4">
        <Streak />
        {!isLoading && session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userImage ? userImage : "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-lightgray text-white border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-3 px-2">
                <p>Email: {session?.user?.email}</p>
                <p>Name: {session?.user?.name}</p>
              </div>
              <DropdownMenuLabel
                onClick={() => signOut()}
                className="hover:cursor-pointer hover:bg-darkgray"
              >
                Log Out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          !isLoading && (
            <Button
              className="bg-darkgray hover:bg-darkgray"
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          )
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center gap-2">
        <Streak />

        {!isLoading && session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userImage ? userImage : "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-lightgray text-white border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-3 px-2">
                <p>Email: {session?.user?.email}</p>
                <p>Name: {session?.user?.name}</p>
              </div>
              <DropdownMenuLabel
                onClick={() => signOut()}
                className="hover:cursor-pointer hover:bg-darkgray"
              >
                Log Out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          !isLoading && (
            <Button
              className="bg-darkgray hover:bg-darkgray"
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          )
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-mediumgray flex flex-col items-center justify-center space-y-6 z-40">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 focus:outline-none"
          >
            <X size={24} />
          </button>
          <Link
            href="/problems"
            className="hover:bg-lightgray p-3 rounded-lg "
            onClick={() => setMenuOpen(false)}
            prefetch={false}
          >
            Problems
          </Link>
          <Link
            href="/mcqs"
            className="hover:bg-lightgray p-3 rounded-lg "
            onClick={() => setMenuOpen(false)}
            prefetch={false}
          >
            MCQs
          </Link>
          <Link
            href="/mentors"
            className="hover:bg-lightgray p-3 rounded-lg "
            onClick={() => setMenuOpen(false)}
            prefetch={false}
          >
            1:1 Mentorship
          </Link>
        </nav>
      )}
    </header>
  );
}

function Streak() {
  const router = usePathname();
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
        console.log(data);
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
    <div className="flex flex-row mr-5">
      <Button className="bg-lightgray hover:bg-lightgray">
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
