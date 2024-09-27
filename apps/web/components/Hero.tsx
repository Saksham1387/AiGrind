import { Piechart } from "./charts/PieChart";
import { ChartData, Radarchart } from "./charts/RadarChart";
import Calendarh from "./charts/calender";
import { getPieChartData, getRadarChartData, getStreakDates } from "../app/db/stats";
import { Welcome } from "./welcome";

export async function Hero() {
  const RadarChartData = await getRadarChartData();
  const PieChartData = await getPieChartData();
  const datesData = await getStreakDates()
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className=" text-[30px] text-black font-bold mt-5 ">
          <Welcome></Welcome>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
          <div className="flex flex-col items-center gap-10 md:gap-12 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center">
              <div className="flex justify-center">
                <Radarchart chartData={RadarChartData} />
              </div>
              <div className="flex justify-center">
                <Piechart  chartData={PieChartData}/>
              </div>
            </div>
            <div className="mt-10 md:mt-0 flex justify-center items-center md:justify-end lg:ml-[250px]">
              <Calendarh DatesData={datesData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
