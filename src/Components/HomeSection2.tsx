import React from "react";
import aiIcon from "../Assets/aiIcon.svg";
import dataScienceIcon from "../Assets/dataScienceIcon.svg";
import aiChallengeIcon from "../Assets/aiChallengeIcon.svg";

interface statDisplayInt {
  title: string;
  description: string;
  icon: string;
}

type statDisplays = statDisplayInt[];

const statDisplay: statDisplays = [
  { title: "100K+", description: "AI model submissions", icon: aiIcon },
  { title: "50K+", description: "Data Scientists", icon: dataScienceIcon },
  { title: "100+", description: "AI Challenges hosted", icon: aiChallengeIcon },
];

const HomeSection2 = () => {
  return (
    <div className="bg-[#002A3B] h-48 px-52 flex items-center justify-between ">
      {statDisplay.map((item, index, array) => (
        <>
          <div className="stat-display-wrapper flex justify-between ">
            <div className="stat-display-icon ">
              <img src={item.icon} alt={item.description} />
            </div>
            <div className="stat-text ml-5">
              <div className="text-2xl font-semibold text-white">{item.title}</div>
              <div className="text-base text-white">{item.description}</div>
            </div>
          </div>
          {array.length - 1 === index ? (
            ""
          ) : (
            <div className="division p-[1px] bg-[#C4C4C4] h-10"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default HomeSection2;
