"use client"
import { useSession } from "next-auth/react";
import { Piechart } from "./charts/PieChart";
import { Radarchart } from "./charts/RadarChart";
import Calendarh from "./charts/calender";

export function Hero() {
  const { data: session, status: sessionStatus } = useSession();
  console.log(session?.user?.name);
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 md:px-6">
      <div className=" text-[30px] text-white font-bold mt-5 ">
            Welcome {session?.user?.name}!
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
          <div className="flex flex-col items-center gap-10 md:gap-12 md:flex-row md:justify-between">
         
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center">
            
              <div className="flex justify-center">
                <Radarchart />
              </div>
              <div className="flex justify-center">
                <Piechart />
              </div>
            </div>
            <div className="mt-10 md:mt-0 flex justify-center items-center md:justify-end lg:ml-[250px]">
              <Calendarh />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
