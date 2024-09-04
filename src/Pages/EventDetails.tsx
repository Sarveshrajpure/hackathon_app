import React, { useState } from "react";

interface dateTimeInt {
  date: number;
  month: string;
  year: number;
  time: string;
}

const EventDetails = () => {
  const [dateTime, setDateTime] = useState<dateTimeInt>({
    date: 1,
    month: "jan",
    year: 1970,
    time: "9:00 AM",
  });
  return <div className="eventDetails-wrapper"></div>;
};

export default EventDetails;
