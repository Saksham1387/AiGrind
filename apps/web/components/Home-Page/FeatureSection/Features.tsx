import Image from "next/image";
import React from "react";
import Link from "next/link";

const SuperpowersOfSuperKalam = () => {
    // ThreeDCardDemo function placed inside SuperpowersOfSuperKalam
    function ThreeDCardDemo() {
        return (
            <div className="inter-var">
                <div className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                    <div className="text-xl font-bold text-neutral-600 dark:text-white">
                        Make things float in air
                    </div>
                    <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Hover over this card to unleash the power of CSS perspective
                    </p>
                    <div className="w-full mt-4">
                        <Image
                            src="/3-d.avif"
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-20">
                        <Link
                            href="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            Try now →
                        </Link>
                        <button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-8 text-white">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-24 text-center">Superpowers of SuperKalam</h1>
            
            {/* Main Container */}
            <div className="flex justify-between items-start">
                {/* Left Section - Use ThreeDCardDemo here */}
                <div className="relative flex flex-col space-y-6 ml-96">
                    <ThreeDCardDemo />
                </div>

                {/* Right Section */}
                <div className="ml-24 max-w-3xl pr-[240px]">
                    <h2 className="text-3xl font-normal mb-6">Daily News Analysis, Evaluation & Streak</h2>
                    <p className="mb-8 text-lg text-neutral-400">
                        Read Editorial Summary and attempt Daily Quiz for revising Current Affairs. 
                        Link them with the GS syllabus for your boosted 
                        preparation.
                    </p>
                    <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Read Today's News
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SuperpowersOfSuperKalam;
