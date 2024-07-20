import Link from "next/link";
import { Piechart } from "./charts/PieChart";
import { Radarchart } from "./charts/RadarChart";
import Calender from "./charts/calender";
import Calendarh from "./charts/calender";

export function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-row gap-[200px]">
            <div className="flex flex-row gap-10 flex-3">
              
              <div className=" ">
                <Radarchart />
              </div>
              <div className="">
                <Piechart />
              </div>
              
            </div>
            <div className="ml-28 ">
              <Calendarh ></Calendarh>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <h1 className="text-3xl md:text-4xl font-bold mb-4 w-full text-center">
    Welcome to DataDex
  </h1>
  <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
  DataDex is a cutting-edge platform designed for hosting exciting programmingmifjsdifjosdjfisdojfidsjo
  contests and challenges. Weather you are a senior developer or a beginner,
    </p>      
                                     */
}
