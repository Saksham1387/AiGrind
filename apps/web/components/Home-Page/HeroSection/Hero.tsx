"use client";
import { TypewriterEffect } from "@repo/ui/TypewriterEffect";

const HeroSection: React.FC = () => {
  const words = [
    {
      text: "Boost",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "your",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "AI",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "and",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "ML",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "skills",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "with",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "our",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "coding",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "platform",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "and",
      className: "text-gray-600 text-2xl"
    },
    {
      text: "expert",
      className: "text-gray-600 text-2xl",
    },
    {
      text: "mentorship.",
      className: "text-gray-600 text-2xl",
    },
  ];
return(
<div className="bg-[#f7f7f8] min-h-screen flex flex-col items-center justify-center px-4 mt-[-170px]">
  <div className="text-center max-w-3xl"> {/* Increased max-w */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
      Welcome to AIgrind
    </h1>
        <div className="mt-4 text-xl font-semibold text-gray-600 leading-relaxed">
          <TypewriterEffect
            words={words}
            className="text-sm font-medium text-gray-600"
          />
        </div>
        <div className="mt-8 w-full flex justify-center">
          <div className="relative max-w-sm w-full">
            <a
              href="#"
              className="bg-blue-600 text-white py-3 px-8 rounded-xl text-lg font-medium hover:bg-blue-500 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
