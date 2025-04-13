
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type CountdownTimerProps = {
  targetDate: Date;
  onComplete?: () => void;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isInFinalSeconds, setIsInFinalSeconds] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsCompleted(true);
        if (onComplete) onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Check if we're in the final 10 seconds
      setIsInFinalSeconds(difference <= 10000);
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && 
          newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && 
          newTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-destructive text-6xl font-bold animate-pulse">Time's Up!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-7 gap-2 items-center">
        <div className="flex flex-col items-center">
          <span className={cn("countdown-digit", isInFinalSeconds && "final-seconds")}>
            {formatNumber(timeLeft.days)}
          </span>
          <span className="countdown-label">Days</span>
        </div>
        
        <span className="countdown-separator">:</span>
        
        <div className="flex flex-col items-center">
          <span className={cn("countdown-digit", isInFinalSeconds && "final-seconds")}>
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="countdown-label">Hours</span>
        </div>
        
        <span className="countdown-separator">:</span>
        
        <div className="flex flex-col items-center">
          <span className={cn("countdown-digit", isInFinalSeconds && "final-seconds")}>
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="countdown-label">Minutes</span>
        </div>
        
        <span className="countdown-separator">:</span>
        
        <div className="flex flex-col items-center">
          <span className={cn("countdown-digit", isInFinalSeconds && "final-seconds")}>
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
