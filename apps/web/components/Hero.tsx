import Link from "next/link";
import { Piechart } from "./charts/PieChart";
import { Radarchart } from "./charts/RadarChart";
import Calender from "./charts/calender";
import Calendarh from "./charts/calender";
import { getRadarChartData } from "../app/db/fetches";

export function Hero() {
  return (
    <section className="  py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-10">
  <div className="flex flex-col items-center gap-10 md:flex-row">
    <div className="">
      <Radarchart />
    </div>
    <div className="">
      <Piechart />
    </div>
  </div>
  <div className="mt-10 md:mt-0 flex justify-center lg:ml-[250px]">
    <Calendarh />
  </div>
</div>
        </div>
      </div>
    </section>
  )
}


