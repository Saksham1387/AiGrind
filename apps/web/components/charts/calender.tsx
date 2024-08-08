"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "../../../../packages/ui/src/@/components/ui/calender";

const Calendarh = ({ DatesData }: any) => {
  let streakDates: Date[] = [];

  if (DatesData && DatesData.streakDates && DatesData.streakDates.length > 0) {
    streakDates = DatesData.streakDates.map(
      (entry: { date: string }) => new Date(entry.date)
    );
  }

  return (
    <div>
      <Calendar streakDates={streakDates} />
    </div>
  );
};
export default Calendarh;
