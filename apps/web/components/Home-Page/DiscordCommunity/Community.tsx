"use client";
import React from "react";
import Image from "next/image";

export function CommunitySection() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 relative my-[150px]">
      {/* Container for the image and text */}
      <div className="relative w-full max-w-screen-xl">
        {/* Adjusted dimensions */}
        <div className="relative w-full" style={{ height: '250px' }}>
          <Image 
            src="/Discord-community.png" // Direct path from the public folder
            alt="Community" 
            layout="fill" // Fill the container
            objectFit="contain" // Ensure the image is contained within the box without being cut
            objectPosition="center" // Center the image in its container
            className="w-full h-full" // Make the image fill its container
          />
        </div>
      </div>

      {/* Headline and text */}
      <div className="text-center mt-6">
        <h2 className="text-3xl font-medium text-gray-800 mb-2">
          You are not alone in this journey
        </h2>
        <p className="text-gray-500 text-lg mb-6">
          Meet 10,000+ aspirants and access handwritten notes, mind-maps, and practice with Daily Targets
        </p>

        {/* Button */}
        <div className="flex justify-center w-full">
          <button className="flex items-center bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2">
            <Image
              src="/discord-icon.png" // Path to the Discord icon
              alt="Discord Icon"
              width={24} // Set the width of the icon
              height={24} // Set the height of the icon
              className="mr-4" // Add some margin to the right for spacing
            />
            Join community
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
