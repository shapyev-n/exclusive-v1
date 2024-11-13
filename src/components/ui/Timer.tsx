"use client";
import React, { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  targetDate: Date | string;
}

const Timer = ({ targetDate }: TimerProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.timer}>
      <div className={styles.timerItem}>
        <span className={styles.label}>Days</span>
        <span className={styles.number}>
          {String(timeLeft.days).padStart(2, "0")}
        </span>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.timerItem}>
        <span className={styles.label}>Hours</span>
        <span className={styles.number}>
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.timerItem}>
        <span className={styles.label}>Minutes</span>
        <span className={styles.number}>
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.timerItem}>
        <span className={styles.label}>Seconds</span>
        <span className={styles.number}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Timer;
