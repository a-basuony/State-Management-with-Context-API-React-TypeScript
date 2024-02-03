import { useTimersContext } from "../store/timer-context";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimersContext();
  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.name}>
          {/* <Timer name={timer.name} duration={timer.duration} /> */}
          {/* spread timer data {...timer} */}
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
}
