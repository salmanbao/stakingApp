import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useEffect, useState } from "react";

//Input Format: "Sep 3, 2022 00:00:00 GMT+0600"
const useCountdown = (target: number) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => {
      let targetDate = new Date(target).getTime();
      let nowDate = new Date().getTime();
      let dateDifference = targetDate - nowDate;

      let days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (dateDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  }, [target]);

  return timeLeft;
};

export default useCountdown;

export const useTimeDiff = (target: BigNumber = BigNumber.from(0)) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useMemo(() => {
    setInterval(() => {
      if(target.eq(0)) return
      const secondsInWeek = 60 * 60 * 24 * 7 * 1000;
      let targetDate = target.toNumber() * 1000 + secondsInWeek;
      let nowDate = Date.now();
      let dateDifference = targetDate - nowDate;

      let days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (dateDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  }, [target]);

  return timeLeft;
};
