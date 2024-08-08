"use client";

import { useSession } from "next-auth/react";

export function Welcome() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <div className="text-[30px] text-white font-bold mt-5">
      <p>Welcome {session?.user?.name}!</p>
    </div>
  );
}
