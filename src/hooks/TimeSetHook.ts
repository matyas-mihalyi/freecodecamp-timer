import { useState } from "react";
import { PeriodTypes } from "../App";

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60000;


export function formatTime(time: number): string {
  const timeInSeconds = time / ONE_SECOND;
  let minutes:number = Math.floor(timeInSeconds / 60);
  let seconds:number = timeInSeconds % 60;

  let formattedMinutes:string = `${minutes}`
  let formattedSeconds:string = `${seconds}`
  
  if (seconds < 10) {
    formattedSeconds = `0${seconds}`
  }
  if (minutes < 10) {
    formattedMinutes = `0${minutes}`
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}



export const useTimeSet = () => {
  const [breakTime, setBreakTime] = useState<number>(5 * ONE_MINUTE);
  const [sessionTime, setSessionTime] = useState<number>(25 * ONE_MINUTE);
  
  function incrementTimeSet (timeSet:number, period:PeriodTypes):void {
    if (timeSet < 60 * ONE_MINUTE) {
      switch (period) {
        case "session":
          setSessionTime(sessionTime + ONE_MINUTE);
          break;
        case "break":
          setBreakTime(breakTime + ONE_MINUTE);
      };
    };
  };
      
  function decrementTimeSet (timeSet:number, period:PeriodTypes):void {
    if (timeSet > ONE_MINUTE) {
      switch (period) {
        case "session":
          setSessionTime(sessionTime - ONE_MINUTE);
          break;
          case "break":
            setBreakTime(breakTime - ONE_MINUTE);
          };
        };
      };
      
  function resetTimeSet () {
    setSessionTime(25 * ONE_MINUTE);
    setBreakTime(5 * ONE_MINUTE);
  }


  return { sessionTime, breakTime, incrementTimeSet, decrementTimeSet, resetTimeSet }

}