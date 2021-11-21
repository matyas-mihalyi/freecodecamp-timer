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
        if (sessionTimeLeft.current === 0 && breakTimeLeft.current === 0) {
          sessionTimeLeft.current = sessionTime;
          breakTimeLeft.current = breakTime;
        };
        
        //when session time is expired start break time
        if(sessionTimeLeft.current === 0) {
          breakTimeLeft.current = breakTimeLeft.current - ONE_SECOND;
          setDisplayedTime(formatTime(breakTimeLeft.current));
        }
        
        //start with sessiontime
        if (sessionTimeLeft.current > 0) {
          console.log("huihih");
          sessionTimeLeft.current = sessionTimeLeft.current - ONE_SECOND;
          console.log(sessionTimeLeft)
          setDisplayedTime(formatTime(sessionTimeLeft.current));
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

  };


  return (
    <div className="timer-control">
      <span id="time-left">{displayedTime}</span>
      <button onClick={()=> startTimer()}>start_stop</button>
      <button onClick={()=> resetTimer()}>reset</button>
    </div>
  );

}