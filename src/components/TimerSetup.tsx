import { PeriodTypes } from '../App';
import {ONE_SECOND, ONE_MINUTE} from '../hooks/TimeSetHook'

type TimerSetupData = {
  sessionTime:number,
  breakTime:number,
  incrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  decrementTimeSet:(timeSet:number, type:PeriodTypes)=> void,
  timerIsRunning:boolean,
}

type TimerSetupProps = {
  data: TimerSetupData,
  type: PeriodTypes
}


export const TimerSetup = (props:TimerSetupProps) => {

  const {sessionTime, breakTime, incrementTimeSet, decrementTimeSet, timerIsRunning } = props.data;
  const type = props.type;

  const timeSet = ():number => {
    switch (type) {
      case "session":
        return sessionTime;
      case "break":
        return breakTime;
    };
  };

  const formattedTime = ():number => {
    switch (type) {
      case "session":
        return sessionTime / ONE_MINUTE;
      case "break":
        return breakTime / ONE_MINUTE;
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
    <div className="setup-wrapper col-md-4 col-xs-12 py-3 d-flex justify-content-center flex-wrap gap-1">
      <h3 id={ids.label} className="period-title text-center">{type} Length</h3>
      <span id={ids.length}>{formattedTime()}</span>
      <button id={ids.increment} onClick={()=> incrementTimeSet(timeSet(), type)} type="button" className="btn btn-sm btn-secondary"><i className="ri-arrow-up-s-line"></i></button>
      <button id={ids.decrement} onClick={()=> decrementTimeSet(timeSet(), type)} type="button" className="btn btn-sm  btn-secondary"><i className="ri-arrow-down-s-line"></i></button>
    </div>
  );
}