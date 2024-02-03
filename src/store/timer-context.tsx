import { ReactNode, createContext, useContext } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimersSTate = {
  isRunning: boolean;
  Timers: Timer[];
};

type TimersContextValue = TimersSTate & {
  addTimer: (data: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timerCtx = useContext(TimersContext);
  if (timerCtx === null) {
    throw new Error("timers context is null that should not be the case !");
  }
  return timerCtx;
}

type TimerContextProviderProps = {
  children: ReactNode;
};

export default function TimerContextProvider({
  children,
}: TimerContextProviderProps) {
  const ctx: TimersContextValue = {
    isRunning: false,
    Timers: [],
    addTimer: (timerData) => {
      // ...logic
    },
    startTimer: () => {
      //...logic
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
