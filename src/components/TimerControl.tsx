import { formatTime, ONE_SECOND } from '../hooks/TimeSetHook';
import { useState, useRef, useEffect } from 'react'

type TimerData = {
  timerIsRunning:boolean,
  timerStarted:()=>void,
  timerStopped:()=>void,
  breakTime:number,
  sessionTime:number,
  resetTimeSet:()=>void
};

type TimerProps = {
  data:TimerData
}


export const TimerControl = (props:TimerProps) => {

  const { timerIsRunning, timerStarted, timerStopped, sessionTime, breakTime, resetTimeSet } = props.data;

  const [timer, setTimer] = useState<null | ReturnType<typeof setInterval>>(null);
  const [displayedTime, setDisplayedTime] = useState<string>(formatTime(sessionTime));
  const [timerLabel, setTimerLabel] = useState<"Session"|"Break">("Session");
  const sessionTimeLeft = useRef<number>(sessionTime);
  const breakTimeLeft = useRef<number>(breakTime);

  useEffect(() => {
    sessionTimeLeft.current = sessionTime;
    breakTimeLeft.current = breakTime;
    setDisplayedTime(formatTime(sessionTime));
    // return () => {
    //   cleanup
    // }
  }, [sessionTime, breakTime])


  function startTimer () {
    if (timerIsRunning && timer !== null) {

      timerStopped();
      clearInterval(timer);

    } else if (!timerIsRunning) {

      timerStarted();
      setTimer ( setInterval(()=> {

        //start with sessiontime reset if both session and break time is expired
        if (sessionTimeLeft.current === 0 && breakTimeLeft.current < 0) {
          sessionTimeLeft.current = sessionTime;
          breakTimeLeft.current = breakTime;
          setDisplayedTime(formatTime(sessionTimeLeft.current));
          setTimerLabel("Session");
        } else
        //when session time is expired start break time
        if(sessionTimeLeft.current === 0) {
          setDisplayedTime(formatTime(breakTimeLeft.current));
          breakTimeLeft.current = breakTimeLeft.current - ONE_SECOND;
          setTimerLabel("Break");
          console.log("breakTimeLeft: " + breakTimeLeft.current)
        } else
        
        //start with sessiontime
        if (sessionTimeLeft.current > 0) {
          sessionTimeLeft.current = sessionTimeLeft.current - ONE_SECOND;
          setDisplayedTime(formatTime(sessionTimeLeft.current));
          console.log("sessionTimeLeft: " + sessionTimeLeft.current)
        }
        
        
      }, 1000));

    } 
  };

  function resetTimer () {
    timerStopped();
    if (timer !== null) {
      clearInterval(timer);
    };
    resetTimeSet();
    sessionTimeLeft.current = sessionTime;
    breakTimeLeft.current = breakTime;
    setDisplayedTime(formatTime(sessionTimeLeft.current));
    setTimerLabel("Session")

  };


  return (
    <div className="timer-control">
      <span id="timer-label">{timerLabel}</span>
      <span id="time-left">{displayedTime}</span>
      <button id="start_stop" onClick={()=> startTimer()}>start_stop</button>
      <button id="reset" onClick={()=> resetTimer()}>reset</button>
    </div>
  );

}