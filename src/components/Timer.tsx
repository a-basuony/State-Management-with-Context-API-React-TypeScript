import Container from "./UI/Container.tsx";
import { Timer as TimerProps } from "../store/timer-context.tsx";
import { useEffect, useRef, useState } from "react";

// type TimerProps ={
//   name: string;
//   duration: number;
// }

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  // let timer;

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    const timer = setInterval(function () {
      setRemainingTime((prevTime) => prevTime - 50);
    }, 50);
    interval.current = timer;
    return () => clearInterval(timer);
  }, []);
  // convert  milliseconds to minutes and seconds
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration} :Milliseconds</p>
      <progress max={duration * 1000} value={remainingTime}></progress>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
