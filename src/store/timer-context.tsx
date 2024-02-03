import { ReactNode, createContext, useContext, useReducer } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimersSTate = {
  isRunning: boolean;
  timers: Timer[];
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

type AddAction = {
  type: "ADD_TIMER";
  payload: Timer;
};
type StartAction = {
  type: "START_TIMER";
};
type StopAction = {
  type: "STOP_TIMER";
};

type Action = AddAction | StartAction | StopAction;

const initialState: TimersSTate = {
  isRunning: false,
  timers: [],
};

function timersReducer(state: TimersSTate, action: Action) {
  if (action.type === "ADD_TIMER") {
    // state.isRunning = true  => wrong way
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  if (action.type === "START_TIMER") {
    return { ...state, isRunning: true };
  }
  if (action.type === "STOP_TIMER") {
    return { ...state, isRunning: false };
  }
  return state;
}

export default function TimerContextProvider({
  children,
}: TimerContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    isRunning: timersState.isRunning,
    timers: timersState.timers,
    addTimer: (timerData) => {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer: () => {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer: () => {
      dispatch({ type: "STOP_TIMER" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
