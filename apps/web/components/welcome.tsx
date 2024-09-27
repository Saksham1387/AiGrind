"use client";

import { useSession } from "next-auth/react";

export function Welcome() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <div className="text-[30px] text-lightpurple font-bold mt-5 flex">
      <p>Welcome </p>
      <p className="text-neutral-800 ml-2">{session?.user?.name}!</p>
    </div>
  );
}
