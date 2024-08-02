"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "./constants";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export const scrollToComponent = (id: any, event: any) => {
  event.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-12 w-13 mr-2" src="./Main-logo.png" alt="Logo" />
            <span className="text-xl tracking-tight">AIgrind</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
                  <button
                    onClick={(e) => {
                      scrollToComponent(item.id, e);
                    }}
                  >
                    {item.label}
                  </button>
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center ml-10">
            <Button
              className="py-2 px-4 border rounded-md bg-lightgray hover:bg-darkgray"
              onClick={() => {
                router.push("/signin");
              }}
            >
              Sign In
            </Button>
            <Button
              className="py-2 px-4 border rounded-md bg-lightgray hover:bg-darkgray"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Create an account
            </Button>
          </div>
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <nav className="fixed top-0 left-0 w-full h-screen bg-mediumgray flex flex-col items-center justify-center z-40">
            <button className="absolute top-4 right-4" onClick={toggleNavbar}>
              <X size={24} />
            </button>
            <ul className="flex flex-col items-center justify-center space-y-6 w-full h-full">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>
                    <button
                      onClick={(e) => {
                        scrollToComponent(item.id, e);
                      }}
                    >
                      {item.label}
                    </button>
                  </a>
                </li>
              ))}
              <Button
                className="px-4 bg-transparent hover:bg-transparent"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Sign In
              </Button>
              <Button
                className="pb-10 px-4 bg-transparent  hover:bg-transparent"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Create an account
              </Button>
            </ul>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
