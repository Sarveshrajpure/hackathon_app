import React, { useEffect, useState } from "react";
import { getEventStatus } from "../Utilities/getEventStaus";
import { monthNames } from "../Constants/Constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import levelIcon from "../Assets/levelIcon.png";
import { Button } from "@mui/material";

interface dateTimeInt {
  date: number;
  month: string;
  year: number;
  time: string;
}

const event = {
  name: "Data Science Bootcamp - Graded Datathon  ",
  startDate: "2024-09-05T23:59:59",
  endDate: "2024-09-10T23:59:59",
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
  image:
    "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
  level: "easy",
};

const EventDetails = () => {
  const [eventStatus, setEventStatus] = useState<string | undefined>("");
  const [dateTime, setDateTime] = useState<dateTimeInt>({
    date: 1,
    month: "jan",
    year: 1970,
    time: "9:00 AM",
  });

  useEffect(() => {
    const startDate = event.startDate;
    const endDate = event.endDate;

    let status = getEventStatus(startDate, endDate);

    setEventStatus(status);

    let dateToBeDisplay = "";

    if (status === "Upcoming") {
      dateToBeDisplay = startDate;
    } else if (status === "Active") {
      dateToBeDisplay = endDate;
    } else if (status === "Past") {
      dateToBeDisplay = endDate;
    }

    let newDate = new Date(dateToBeDisplay);
    setDateTime({
      date: newDate.getDate(),
      month: monthNames[newDate.getMonth()],
      year: newDate.getFullYear(),
      time: newDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    });
  }, []);

  const getFormattedDateTime = (eventStatus: string | undefined) => {
    const formattedDateTime = `${dateTime.date} ${dateTime.month}' ${dateTime.year} ${dateTime.time} `;

    if (eventStatus === "Upcoming") {
      return `Starts on ${formattedDateTime} (India Standard Time) `;
    } else if (eventStatus === "Active") {
      return `Started on ${formattedDateTime} (India Standard Time)`;
    } else if (eventStatus === "Past") {
      return `Ended on ${formattedDateTime} (India Standard Time)`;
    }
  };

  return (
    <div className="eventDetails-wrapper">
      <div className="eventDetails-title-wrapper bg-[#003145] h-[26rem] px-20 py-20">
        <div
          className="eventDetails-date-time-dispaly flex items-center gap-3 w-[28rem] text-sm font-semibold
         px-4 py-2 bg-[#FFCE5C] rounded-md mb-5"
        >
          <AccessTimeIcon sx={{ width: "1.2rem", height: "1.2rem" }} />
          {getFormattedDateTime(eventStatus)}
        </div>
        <div className="eventDetails-title text-4xl font-semibold text-white mb-5">
          {event.name}
        </div>

        <div
          className="eventDetails-level-display mb-5 flex  gap-2 bg-white text-sm font-semibold
         min-w-[6rem] w-max px-4 py-2 rounded-md text-[#003145]"
        >
          <img src={levelIcon} alt="levelIcon" className="w-[18px] h-[18px]" />
          {event.level.charAt(0).toUpperCase() + event.level.slice(1)}
        </div>
      </div>

      <div className="eventDetails-overview-wrapper">
        <div className="eventDetails-overview-navbar">
          <div className="bg-[#FFFFFF] flex justify-around pt-2 pb-2 px-4 shadow-md">
            <div className="pl-20  flex flex-col justify-start items-center  w-[10%]">
              <div className="pt-2 text-lg font-semibold">Overview</div>
              <div className="p-[0.15rem] w-[7rem] absolute top-[515px] bg-green-700 rounded-sm "></div>
            </div>
            <div className="btns-wrapper flex justify-end gap-4 w-[70%]">
              <div className="edit-btn-wrapper flex justify-center ">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#44924C",
                    color: "white",
                    fontSize: "14px",
                    borderRadius: "10px",
                  }}
                >
                  Edit
                </Button>
              </div>
              <div className="delete-btn-wrapper flex justify-center ">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ fontSize: "14px", borderRadius: "10px" }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="event-desc-wrapper p-20 pr-44">
        <div className="event-desc-content px-20 ">{event.description}</div>
      </div>
    </div>
  );
};

export default EventDetails;
