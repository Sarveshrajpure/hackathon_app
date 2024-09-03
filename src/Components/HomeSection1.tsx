import React from "react";
import rocketImg from "../Assets/rocket.svg";
import { Button } from "@mui/material";

const HomeSection1 = () => {
  return (
    <div className="bg-[#003145] h-[28.2rem] flex justify-around items-center px-20">
      <div className="create-challenge-text-wrapper ">
        <div className="title-vertical-line-wrapper flex h-[6.5rem] items-center ">
          <div className=" p-[0.2rem] bg-yellow-500 h-full"> </div>
          <div className="create-challenge-title w-[39rem] text-5xl text-white leading-[3.5rem] ml-7">
            Accelerate Innovation with Global AI Challenges
          </div>
        </div>

        <div className="w-[35rem] pl-7 text-lg text-white mt-5">
          AI Challenges at DPhi simulate real-world problems. It is a great place to put your
          AI/Data Science skills to test on diverse datasets allowing you to foster learning through
          competitions.
        </div>
        <div className="create-challenge-btn pl-6 mt-5">
          <Button variant="contained" sx={{ bgcolor: "white", color: "black", fontSize: "18px" }}>
            Create Challenge
          </Button>
        </div>
      </div>
      <div className="create-challenge-img-wrapper">
        <img src={rocketImg} alt="rocketImg" />
      </div>
    </div>
  );
};

export default HomeSection1;
