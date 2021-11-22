import React from 'react';
import './App.css';
import { TimerSetup } from './components/TimerSetup';
import { TimerControl } from './components/TimerControl';
import { useTimerState } from './hooks/TimerStateHook';
import {useTimeSet} from './hooks/TimeSetHook';

export type PeriodTypes = "break" | "session";

function App() {

  const { sessionTime, breakTime, incrementTimeSet, decrementTimeSet,  resetTimeSet } = useTimeSet();
  const { timerIsRunning, timerStarted, timerStopped } = useTimerState();

  const timerSetupProps = {sessionTime, breakTime, incrementTimeSet, decrementTimeSet, timerIsRunning };

  const timerControlProps = { timerIsRunning, timerStarted, timerStopped, sessionTime, breakTime, resetTimeSet };

  return (
    <div className="App">
      <TimerSetup type="session" data={timerSetupProps}/>
      <TimerSetup type="break" data={timerSetupProps}/>
      <TimerControl data={timerControlProps}/>
    </div>
  );
}

export default App;
