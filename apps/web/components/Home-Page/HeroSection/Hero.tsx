"use client";

import { TypewriterEffect } from "@repo/ui/TypewriterEffect";
import { useRouter } from "next/navigation";
import NavBar from "../NavBar/NavBar";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const createWords = (sentence: string, className: string) => {
    return sentence.split(" ").map((word) => ({
      text: word,
      className: className,
    }));
  };

  const words = createWords(
    "Elevate your AI/ML expertise with hands-on coding challenges, AI interview prep, and personalized mentorship.",
    "text-gray-600 text-2xl"
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 mt-[-170px] bg-[#f6f5f3]">
      <div className="text-center max-w-3xl font-medium">
        <h1 className="text-6xl font-medium text-gray-900 leading-tight">
          Welcome to{" "}
          <span className="underline decoration-2 underline-offset-[17px] decoration-blue-500">
            AIgrind
          </span>
        </h1>
        <div className="mt-4 text-xl font-semibold text-gray-600 leading-relaxed">
          <div className="inline-block max-w-full">
            <TypewriterEffect
              words={words}
              className="text-xl font-medium text-gray-600"
            />
          </div>
        </div>
        <div className="mt-8 w-full flex justify-center">
          <div className="relative max-w-sm w-full">
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="bg-blue-600 text-white w-[161px] h-[56px] rounded-2xl text-lg font-medium hover:bg-blue-500 transition flex items-center justify-center mx-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
