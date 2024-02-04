import Container from "./UI/Container.tsx";
import { Timer as TimerProps } from "../store/timer-context.tsx";
import { useEffect, useState } from "react";

// type TimerProps ={
//   name: string;
//   duration: number;
// }

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  useEffect(() => {
    setInterval(function () {
      setRemainingTime((prevTime) => prevTime - 50);
    }, 50);
  }, []);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
      <progress max={duration * 1000} value={remainingTime}></progress>
      <p>{remainingTime}</p>
    </Container>
  );
}
