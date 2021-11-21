import { useState } from "react";

export const useTimerState = () => {

  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);

  function timerStarted () {
    setTimerIsRunning(true);
  };

  function timerStopped () {
    setTimerIsRunning(false);
  };

  return { timerIsRunning, timerStarted, timerStopped }

};