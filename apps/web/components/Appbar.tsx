"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@repo/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useSession, signOut } from "next-auth/react";

export default function SidebarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status: sessionStatus } = useSession();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Coding",
      href: "/problems",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "MCQ",
      href: "/mcqs",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Mentorship",
      href: "/mentors",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Interview",
      href: "/interview",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-screen flex-1 mx-auto  ",
        "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-col flex-1 ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-40 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session?.user?.name || "",
                href: "#",
                icon: (
                  <img
                    src={
                      session?.user?.image || "https://github.com/shadcn.png"
                    }
                    className="h-7 w-7 mt-40 flex-shrink-0 rounded-full "
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
          <div>
            
          <button
         onClick={() => signOut()}
         className="flex items-center space-x-1 pl- text-sm text-  relative z-20  "
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
        >
              <IconArrowLeft className="h-5 w-5"  />
              {hover && <div className="absolute left-1 top-8 bg-white border border-purple shadow-lg p-2 rounded-md " style={{ transform: 'translateY(-90%) translateX(50%)', top: '100%' }}>signout</div>}
            <div></div>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Render children instead of Dashboard */}
      <div className="">{children}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20 "
    >
      <div className="h-5 w-6  dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 " />
      <div className="flex flex-row">
        <div>
          <img src="/new-logo.png" className="h-9 w-9" />
        </div>
        <div>
         
        </div>
      </div>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="#" className="">
      <img src="/new-logo.png" className=" " />
    </Link>
  );
};
