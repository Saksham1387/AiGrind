// "use client"
// import React, { useEffect, useState } from "react";
// import { Calendar } from "../../../../packages/ui/src/@/components/ui/calender"
// import { useSession } from "next-auth/react";

// const fetchStreakDates = async (userId: string) => {
//   const response = await fetch("/api/streak/dates", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   // @ts-ignore
//   return data.streakDates.map((entry: { date: string }) => new Date(entry.date));
// };

// const Calendarh = () => {
//   const { data: session } = useSession();
//   // @ts-ignore
//   const userId = session?.user?.id;
//   const [streakDates, setStreakDates] = useState<Date[]>([]);

//   useEffect(() => {
//     const getStreakDates = async () => {
//       const dates = await fetchStreakDates(userId);
//       setStreakDates(dates);
//     };
//     getStreakDates();
//   }, [userId]);

//   return (
//     <div>
//         <Calendar streakDates={streakDates} />
//     </div>
//   )
  
// };

// export default Calendarh;

"use client";

import { useState, useEffect } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
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
      const response = await fetch(`/api/stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "solvedUnsolvedCounts"
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
            <Pie data={chartData} dataKey="count" nameKey="status" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} questions`, name]} 
              labelFormatter={(label) => `Status: ${label}`} 
            />
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