// "use client"
// import { Pie, PieChart } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../../../packages/ui/src/@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
// } from "../../../../packages/ui/src/@/components/ui/chart"
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function Piechart() {
//   return (
//     <Card className="flex flex-col h-[400px] w-[300px]">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Pie Chart - Legend</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[300px]"
//         >
//           <PieChart>
//             <Pie data={chartData} dataKey="visitors" />
//             <ChartLegend
//               content={<ChartLegendContent nameKey="browser" />}
//               className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
//             />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }



"use client";

import { useState, useEffect } from "react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../packages/ui/src/@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "../../../../packages/ui/src/@/components/ui/chart";

interface ChartData {
  status: string;
  count: number;
  fill: string;
}

const chartConfig: ChartConfig = {
  solved: {
    label: "Solved",
    color: "hsl(var(--chart-1))",
  },
  unsolved: {
    label: "Unsolved",
    color: "hsl(var(--chart-2))",
  },
};





export function Piechart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchProblemsStats(): Promise<ChartData[]> {
      const response = await fetch(`/api/stats`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          type:"solvedUnsolvedCounts"
        })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return [
        { status: "solved", count: data.solved, fill: "var(--color-solved)" },
        { status: "unsolved", count: data.unsolved, fill: "var(--color-unsolved)" },
      ];
    }
    async function getData() {
      try {
        const data = await fetchProblemsStats();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    getData();
  }, []);

  return (
    <Card className="flex flex-col h-[400px] w-[300px]">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Problem Solving Stats</CardTitle>
        <CardDescription>Showing solved and unsolved problems</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="count" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}