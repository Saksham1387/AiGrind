"use client";
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

export interface ChartData {
  category: string;
  count: number;
}
const chartConfig: ChartConfig = {
  categories: {
    label: "Categories",
    color: "hsl(var(--chart-1))",
  },
};

export function Radarchart({chartData} :any) {  
  return (
    <Card className="w-[300px] h-[400px] bg-lightgray border-none text-white">
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
