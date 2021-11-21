import { PeriodTypes } from '../App'

type TimerSetupData = {
  sessionTime:number,
  breakTime:number,
  formattedSessionTime:string,
  formattedBreakTime:string,
  incrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  decrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  timerIsRunning:boolean,
}

type TimerSetupProps = {
  data: TimerSetupData,
  type: PeriodTypes
}


export const TimerSetup = (props:TimerSetupProps) => {

  const {sessionTime, breakTime, formattedSessionTime, formattedBreakTime, incrementTimeSet, decrementTimeSet, timerIsRunning } = props.data;
  const type = props.type;

  const timeSet = ():number => {
    switch (type) {
      case "session":
        return sessionTime;
      case "break":
        return breakTime;
    };
  };

  const formattedTime = ():string => {
    switch (type) {
      case "session":
        return formattedSessionTime;
      case "break":
        return formattedBreakTime;
    };
  };
  
  type IdTypes = "increment"|"decrement"|"label"|"length";

  type ElementIds = {
    [propNames in IdTypes]: string;
  };

  const ids:ElementIds = {
    increment: `${type}-increment`,
    decrement: `${type}-decrement`,
    label: `${type}-label`,
    length: `${type}-length`
  };
  
  
  return (
    <div className="setup-wrapper">
      <h2 id={ids.label}>{type} Length</h2>
      <span id={ids.length}>{formattedTime()}</span>
      <button id={ids.increment} onClick={()=> incrementTimeSet(timeSet(), type)} type="button">increment</button>
      <button id={ids.decrement} onClick={()=> decrementTimeSet(timeSet(), type)} type="button">decrement</button>
    </div>
  );
}