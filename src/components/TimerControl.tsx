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
};


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
  }, [sessionTime, breakTime]);


  function startTimer (): void {
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
          playAudio();
        } else
        //when session time is expired start break time
        if(sessionTimeLeft.current === 0) {
          audioElement.current?.play();
          setDisplayedTime(formatTime(breakTimeLeft.current));
          breakTimeLeft.current = breakTimeLeft.current - ONE_SECOND;
          setTimerLabel("Break");
          playAudio();
        } else
        
        //start with sessiontime
        if (sessionTimeLeft.current > 0) {
          sessionTimeLeft.current = sessionTimeLeft.current - ONE_SECOND;
          setDisplayedTime(formatTime(sessionTimeLeft.current));
        };
        
      }, 1000));

    }
  };

  
  function resetTimer (): void {
    timerStopped();
    if (timer !== null) {
      clearInterval(timer);
    };
    resetTimeSet();
    sessionTimeLeft.current = sessionTime;
    breakTimeLeft.current = breakTime;
    setDisplayedTime(formatTime(sessionTimeLeft.current));
    setTimerLabel("Session");
    stopAudio();
  };
  
  const audioElement = useRef<HTMLAudioElement>(null);
  function playAudio () {
    audioElement.current?.play();
  };
  
  function stopAudio () {
    audioElement.current?.pause();
    audioElement.current!.currentTime = 0;
  };


  return (
    <div className="timer-control col-md-4 col-xs-12 d-flex gap-2 justify-content-center flex-wrap py-3">
      <h2 id="timer-label" className="text-center">{timerLabel}</h2>
      <span id="time-left" className="text-center">{displayedTime}</span>
      <button id="start_stop" className="btn btn-primary" onClick={()=> startTimer()}><i className="ri-play-fill"></i></button>
      <button id="reset" className="btn btn-secondary" onClick={()=> resetTimer()}><i className="ri-refresh-line"></i></button>
      <audio id="beep" ref={audioElement} src="https://soundbible.com/mp3/Fire_pager-jason-1283464858.mp3" />
    </div>
  );

}