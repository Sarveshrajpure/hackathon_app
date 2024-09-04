import React, { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";
import { monthNames } from "../Constants/Constants";
import { Button } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from "react-router-dom";
import { getEventStatus } from "../Utilities/getEventStaus";

interface Props {
  eventData: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    image: string;
    level: string;
  };
}

interface PastDateInt {
  date: number;
  month: string;
  year: number;
  time: string;
}

const EventCard: React.FC<Props> = ({ eventData }) => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState<string | undefined>("");
  const [pastDate, setPastDate] = useState<PastDateInt>({
    date: 1,
    month: "jan",
    year: 1970,
    time: "9:00 AM",
  });

  useEffect(() => {
    const startDate = eventData.startDate;
    const endDate = eventData.endDate;

    let status = getEventStatus(startDate, endDate);

    setEventStatus(status);

    if (status === "Past") {
      let pastDate = new Date(endDate);
      setPastDate({
        date: pastDate.getDate(),
        month: monthNames[pastDate.getMonth()],
        year: pastDate.getFullYear(),
        time: pastDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    }
  }, [eventData.endDate, eventData.startDate]);

  const handleParicipateNowClick = () => {
    navigate("/eventdetails", { state: { id: "123" } });
  };

  return (
    <div className="event-card-wrapper rounded-2xl bg-white w-[21rem] mb-10">
      <div className="event-card-img-wrapper ">
        <img
          src={eventData.image}
          alt={eventData.name}
          className="w-full rounded-t-2xl shadow-[0px_-3.3px_24px_0px_#84848429] object-cover  h-[174px]"
        />
      </div>
      <div className="event-card-desc-wrapper px-10 py-5">
        <div className="event-card-status-wrapper flex justify-center pb-2">
          <div
            className={`w-[5.5rem] py-1 ${
              eventStatus === "Upcoming"
                ? "bg-[#F2C94C] text-[#666666]"
                : eventStatus === "Active"
                ? "bg-[#44924C]/25 text-[#44924C]"
                : eventStatus === "Past"
                ? "bg-[#FF3C00]/25 text-[#666666]"
                : ""
            } rounded-md text-sm font-normal text-center`}
          >
            {eventStatus}
          </div>
        </div>
        <div className="event-card-name text-center text-base font-semibold mb-5">
          {eventData.name}
        </div>
        <div className={`event-card-timer  ${eventStatus === "Past" ? "mb-9" : "mb-5"}`}>
          <div className="event-card-timer-title text-center text-[#444444] text-md font-medium mb-2">
            {eventStatus === "Active"
              ? "Ends - In"
              : eventStatus === "Upcoming"
              ? "Starts - In"
              : eventStatus === "Past"
              ? "Ended on"
              : ""}
          </div>

          {eventStatus === "Past" ? (
            <div className="past-date-wrapper flex gap-1  justify-center text-lg font-semibold">
              <div>
                {pastDate.date % 10 === 1
                  ? pastDate.date + "st"
                  : pastDate.date % 10 === 2
                  ? pastDate.date + "nd"
                  : pastDate.date % 10 === 3
                  ? pastDate.date + "rd"
                  : pastDate.date + "th"}
              </div>
              <div>{pastDate.month}'</div>
              <div>{pastDate.year % 100}</div>
              <div>{pastDate.time}</div>
            </div>
          ) : (
            <CountDownTimer
              targetDate={`${
                eventStatus === "Upcoming"
                  ? eventData.startDate
                  : eventStatus === "Active"
                  ? eventData.endDate
                  : ""
              }`}
            />
          )}
        </div>

        <div className="participate-now-btn-wrapper flex justify-center ">
          <Button
            variant="contained"
            startIcon={<TaskAltIcon sx={{ color: "white" }} />}
            sx={{ bgcolor: "#44924C", color: "white", fontSize: "14px" }}
            onClick={handleParicipateNowClick}
          >
            Participate Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
