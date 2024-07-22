"use client"
import React, { useEffect, useState } from "react";
import { Calendar } from "../../../../packages/ui/src/@/components/ui/calender"
import { useSession } from "next-auth/react";

const fetchStreakDates = async (userId: string) => {
  const response = await fetch("/api/streak/dates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  // @ts-ignore
  return data.streakDates.map((entry: { date: string }) => new Date(entry.date));
};

const Calendarh = () => {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;
  const [streakDates, setStreakDates] = useState<Date[]>([]);

  useEffect(() => {
    const getStreakDates = async () => {
      const dates = await fetchStreakDates(userId);
      setStreakDates(dates);
    };

    getStreakDates();
  }, [userId]);

  return (
    <div>
        <Calendar streakDates={streakDates} />;

    </div>
  )
  
};

export default Calendarh;