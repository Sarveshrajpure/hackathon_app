import React, { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

const getTimeLeft = (countDownTarget: any) => {
  let currentDate: any = new Date();
  const totalTimeLeft = countDownTarget - currentDate;

  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);

  return { days, hours, mins, seconds };
};

const CountDownTimer: React.FC<Props> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const countDownTarget: any = new Date(targetDate);
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(countDownTarget));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  return (
    <div className="flex justify-center px-10">
      <div className="countdown-content flex justify-center items-center gap-1 w-full">
        <div className="box flex flex-col justify-center ">
          <div className="value  text-center ">
            <span className="text-xl font-bold">{isNaN(timeLeft.days) ? "00" : timeLeft.days}</span>
          </div>
          <span className="label text-xs font-medium text-center  w-full">Days</span>
        </div>
        <div className="text-lg font-bold  h-full">:</div>

        <div className="box flex flex-col justify-center">
          <div className="value  text-center ">
            <span className="text-xl font-bold">
              {isNaN(timeLeft.hours) ? "00" : timeLeft.hours}
            </span>
          </div>
          <span className="label text-xs font-medium text-center  w-full">Hours</span>
        </div>
        <div className="text-lg font-bold  h-full">:</div>

        <div className="box flex flex-col justify-center">
          <div className="value  text-center ">
            <span className="text-xl font-bold">{isNaN(timeLeft.mins) ? "00" : timeLeft.mins}</span>
          </div>
          <span className="label text-xs font-medium text-center  w-full">Mins</span>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
