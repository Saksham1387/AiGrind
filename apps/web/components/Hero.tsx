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
  )
}


