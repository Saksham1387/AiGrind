"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "./constants";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";


export const scrollToComponent = (
  id:any,
  event:any
) => {
  event.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMailClick = (email:any) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-12 w-13 mr-2" src="./Main-logo.png" alt="Logo" />
            <span className="text-xl tracking-tight">AIgrind</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <button href={item.href} 
                onClick={(e)=>{
                  scrollToComponent(item.id,e)
                  
                }}>{item.label} </button>
              </li>
            ))}
          </ul> 
          <div className="hidden lg:flex justify-center space-x-12 items-center ml-10">
            <Button className="py-2  border rounded-md bg-lightgray"
            onClick={()=>{
              router.push("/signin")
            }}
            >
              Sign In
            </Button>
            <Button
              
              className="py-2 border rounded-md bg-lightgray"
              onClick={()=>{
                router.push("/signup")
              }}
            >

              Create an account
            </Button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md bg-white">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;