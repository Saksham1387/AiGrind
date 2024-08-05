"use client";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-mediumgray shadow w-screen dark:bg-gray-900 text-white border-t-[0.2px] border-gray-600">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/Main-logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AIgrind
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 dark:text-gray-400 text-white">
            <li>
              <div className="flex flex-row">
                <button
                  onClick={() => {
                    window.open("https://github.com/Saksham1387", "_blank");
                  }}
                  className="hover:underline me-4 md:me-6 ml-3"
                >
                  <Github></Github>
                </button>
              </div>
            </li>
            <li>
              <button
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/parth-thirwani-887b26217/",
                    "_blank"
                  );
                }}
                className="hover:underline me-4 md:me-6"
              >
                <Linkedin />
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.open("https://x.com/IgrindA99328", "_blank");
                }}
                className="hover:underline me-4 md:me-6"
              >
                <Twitter></Twitter>
              </button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      </div>
    </footer>
  );
};
