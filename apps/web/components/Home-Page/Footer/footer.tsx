"use client";
import { Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1E1E28] w-screen text-white">
      <div className="max-w-screen-xl mx-auto py-48 px-8"> {/* Increased top and bottom padding */}
        <div className="flex justify-between items-center">
          <a href="" className="flex items-center space-x-4">
            <img src="/new-logo.png" className="h-12"  />
            <span className="self-center text-3xl font-normal">
              AIgrind
            </span>
          </a>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => {
                  window.open("https://x.com/IgrindA99328", "_blank");
                }}
                className="hover:underline"
              >
                <Twitter />
              </button>
            </li>
          </ul>
        </div>

        <hr className="my-16 border-gray-600 border-2" /> {/* Increased margin to lower the bar */}

        <div className="flex flex-col md:flex-row md:justify-between text-white text-lg font-semibold mt-16"> {/* Added margin to lower the text */}
        <span className="text-blue-800">© All rights reserved by <span className="text-purple-600">AIgrind Inc.</span> </span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
