"use client"
import { useState } from 'react';
import RegularTimer from '../components/RegularTimer';
import PomodoroTimer from '../components/PomodoroTimer';

const Timer = () => {
  const [showRegularTimer, setShowRegularTimer] = useState(true);

  return (
    <div className='md:col-start-2 md:row-span-2'>
      <div className='rounded-lg border border-gray overflow-hidden text-black flex items-center'>
        <button 
          onClick={() => setShowRegularTimer(true)} 
          className={`w-full py-3 px-8 text-sm font-bold capitalize ${showRegularTimer ? 'bg-black text-white' : 'hover:bg-gray-light'}`}
        >
          Regular Timer
        </button>
        <button 
          onClick={() => setShowRegularTimer(false)} 
          className={`w-full py-3 px-8 text-sm font-bold capitalize ${!showRegularTimer ? 'bg-black text-white' : 'hover:bg-gray-light'}`}
        >
          Pomodoro Timer
        </button>
      </div>
      {showRegularTimer ? <RegularTimer /> : <PomodoroTimer />}
    </div>
  );
};

export default Timer;