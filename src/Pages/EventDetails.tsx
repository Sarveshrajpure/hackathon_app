import React, { useEffect, useState } from "react";
import { getEventStatus } from "../Utilities/getEventStaus";
import { monthNames } from "../Constants/Constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import levelIcon from "../Assets/levelIcon.png";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface dateTimeInt {
  date: number;
  month: string;
  year: number;
  time: string;
}

interface eventDataInt {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  level: string;
}

const EventDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id: string | undefined = params.id;
  const [event, setEvent] = useState<eventDataInt>({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
    level: "",
  });
  const [eventStatus, setEventStatus] = useState<string | undefined>("");
  const [dateTime, setDateTime] = useState<dateTimeInt>({
    date: 1,
    month: "jan",
    year: 1970,
    time: "9:00 AM",
  });

  useEffect(() => {
    const fetchChallenge = () => {
      try {
        const localStorageData = JSON.parse(localStorage.getItem("challenges") as string);
        let filterChallenge;
        if (localStorageData && localStorageData.length > 0) {
          filterChallenge = localStorageData.find((item: any) => item.id === id);
          
          setEvent(filterChallenge);
        } else {
          setEvent({
            id: "",
            name: "",
            startDate: "",
            endDate: "",
            description: "",
            image: "",
            level: "",
          });
        }
        const startDate = filterChallenge.startDate;
        const endDate = filterChallenge.endDate;

        let status = getEventStatus(startDate, endDate);

        setEventStatus(status);

        let dateToBeDisplay = "";

        if (status === "Upcoming") {
          dateToBeDisplay = startDate;
        } else if (status === "Active") {
          dateToBeDisplay = startDate;
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
      } catch (error) {
        toast.error("Error fetching challenge details!");
      }
    };

    fetchChallenge();
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

  const handleEditChallenge = () => {
    navigate(`/editevent/${id}`);
  };

  const handleDeleteChallenge = (id: string | undefined) => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("challenges") as string);

      if (localStorageData && localStorageData.length > 0) {
        let newChallenges = localStorageData.filter((item: any) => item.id !== id);

    
        localStorage.setItem("challenges", JSON.stringify(newChallenges));
        toast.success("Challenge deleted!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error deleting challenge");
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
                  onClick={handleEditChallenge}
                >
                  Edit
                </Button>
              </div>
              <div className="delete-btn-wrapper flex justify-center ">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ fontSize: "14px", borderRadius: "10px" }}
                  onClick={() => handleDeleteChallenge(id)}
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
