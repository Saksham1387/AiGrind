"use client";
import { useState, useEffect } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../packages/ui/src/@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../packages/ui/src/@/components/ui/chart";

interface ChartData {
  category: string;
  count: number;
}
const chartConfig: ChartConfig = {
  categories: {
    label: "Categories",
    color: "hsl(var(--chart-1))",
  },
};

export function Radarchart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function getData() {
      async function fetchSolvedProblemsStats(): Promise<ChartData[]> {
        const response = await fetch(`/api/stats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "categoryCounts",
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return await response.json();
      }
      try {
        const data = await fetchSolvedProblemsStats();
        console.log(data);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    getData();
  }, []);

  return (
    <Card className="w-[300px] bg-lightgray border-none text-white">
      <CardHeader className="items-center text-center">
        <CardTitle>Skill Level</CardTitle>
        <CardDescription>Solve Problems to see your stats</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData} className="w-[300px] text-black">
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-categories)"
              fillOpacity={0.6}
              dot={{
                r: 5,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Data based on problem-solving stats
        </div>
      </CardFooter>
    </Card>
  );
}
