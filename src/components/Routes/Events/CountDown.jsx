import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeleft, setTimeleft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeleft(calculateTimeLeft());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  function calculateTimeLeft() {
    const difference = +new Date("2024-01-3") - +new Date();
    let timeleft = {};
    if (difference > 0) {
      timeleft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        second: Math.floor((difference / 1000) % 60),
      };
    }
    return timeleft;
  }

  const timerComponents = Object.keys(timeleft).map((interval, index) => {
    if (!timeleft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-blue-400 mx-2" key={index}>
        {timeleft[interval]} {interval}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">
          {" "}
          Time's up, Events Expired
        </span>
      )}
    </div>
  );
};

export default CountDown;
