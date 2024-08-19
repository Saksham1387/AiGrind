import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@repo/ui/3d-card";

const SuperpowersOfSuperKalam = () => {
  return (
    <div className="bg-gray-800 p-8 text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-24 mt-10 text-center">
        Superpowers of AIgrind
      </h1>

      {/* Main Container */}
      <div className="flex justify-center items-center space-x-[100px]">
  {/* Left Section - Use ThreeDCardDemo here */}
  <div className=" flex flex-col space-y-6">
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem
          translateZ="100"
         
          className="w-full mt-4"
        >
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  </div>

  {/* Right Section */}
  <div className="max-w-3xl">
    <h2 className="text-3xl font-normal mb-6">
      Daily News Analysis, Evaluation & Streak
    </h2>
    <p className="mb-8 text-lg text-neutral-400">
      Read Editorial Summary and attempt Daily Quiz for revising Current
      Affairs. Link them with the GS syllabus for your boosted
      preparation.
    </p>
    <a
      href="#"
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Read Today's News
    </a>
  </div>


</div>

    </div>
  );
};

export default SuperpowersOfSuperKalam;
