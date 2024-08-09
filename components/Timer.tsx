"use client"
import { useState } from 'react';
import RegularTimer from '../components/RegularTimer';
import PomodoroTimer from '../components/PomodoroTimer';

const Timer = () => {
  const [showRegularTimer, setShowRegularTimer] = useState(true);

  return (
    <div className='timer-wrapper'>
      <div className='timer-header'>
        <button onClick={() => setShowRegularTimer(true)} className={showRegularTimer ? 'highlight' : ''}>Regular Timer</button>
        <button onClick={() => setShowRegularTimer(false)} className={showRegularTimer ? '' : 'highlight'}>Pomodoro Timer</button>
      </div>
      {showRegularTimer ? <RegularTimer /> : <PomodoroTimer />}
    </div>
  );
};

export default Timer;