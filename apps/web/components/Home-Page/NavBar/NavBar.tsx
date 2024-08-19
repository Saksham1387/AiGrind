import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-darkgray">
      <div className="flex justify-between items-center space-y-8 py-6 p-4 bg-darkgray ">
        <a href="#" className="flex items-center px-[170px]">
          <img src="new-logo.png" alt="Logo" className="w-12 h-12" />
          <span className="text-black text-3xl font-semibold">AIgrind</span>
          <p className="text-[12px] mt-5 ">BETA</p>
        </a>
        <div className="flex items-center space-x-4 pr-[190px] ">
          <Button
            className="bg-white border  text-blue-600 w-[139px] h-[48px] flex justify-center items-center rounded-2xl text-lg font-medium hover:bg-blue-50 transition"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <Button
            className="bg-blue-600 text-white w-[139px] h-[48px] flex justify-center items-center rounded-2xl text-lg font-medium hover:bg-blue-500 transition"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
