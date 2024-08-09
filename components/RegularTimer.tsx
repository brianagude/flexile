"use client"
// components/Timer.tsx

import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const RegularTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { tasks, addTimeToTask } = useTaskContext();

  const toggleTimer = () => {
    setIsActive((prevState) => !prevState);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const handleTaskChange = (e) => {
    setTaskName(e.target.value);
  };

  const logTime = () => {
    if (taskName && time > 0) {
      addTimeToTask(taskName, time);
      resetTimer();
    }
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 60); // Increase time by 60 seconds (1 minute)
      }, 60000); // Update every 60 seconds
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div className='timer regular-timer'>
      <div className='countdown-buttons'>
        <div className='countdown'>{formatTime(time)}</div>
        <div className='buttons'>
          <button onClick={toggleTimer} disabled={!taskName}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} disabled={!taskName || !isActive}>
            Reset
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="What are you working on?"
        list="tasks"
        value={taskName}
        onChange={handleTaskChange}
      />
      <datalist id="tasks">
        {tasks.map(task => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>
    </div>
  );
};

export default RegularTimer;