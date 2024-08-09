"use client"
// components/PomodoroTimer.tsx

import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const PomodoroTimer = () => {
  const { tasks, addTimeToTask } = useTaskContext();
  const [time, setTime] = useState(1500); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskName, setTaskName] = useState('');

  const toggleTimer = () => {
    if (taskName) {
      setIsActive(!isActive);
    }
  };

  const handleTaskChange = (e) => {
    setTaskName(e.target.value);
  };

  const startBreak = () => {
    if (!isBreak) {
      setIsBreak(true);
      setTime(300); // Set break time to 5 minutes
    } else {
      setIsBreak(false);
      setTime(1500); // Set focus time to 25 minutes
    }
    setIsActive(false);
  };

  const logTime = () => {
    if (taskName && !isBreak) {
      addTimeToTask(taskName, 1500 - time); // Log the time spent during focus session
    }
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      if (isBreak) {
        alert('Break over! Time to get back to work.');
        setIsBreak(false);
        setTime(1500);
      } else {
        alert('Pomodoro session over! Time for a break.');
        logTime();
        setIsBreak(true);
        setTime(300);
      }
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <div className='timer pomodoro-timer'>
      <div className='countdown-buttons'>
        <div className='countdown'>
          {new Date(time * 1000).toISOString().substr(14, 5)}
          <span>{isBreak ? 'Break' : 'Focus'}</span>
        </div>
        <div className='buttons'>
          <button onClick={toggleTimer} disabled={!taskName}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={startBreak} disabled={!taskName}>
            {isBreak ? 'Focus' : 'Break'}
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
        {tasks.map((task) => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>      
    </div>
  );
};

export default PomodoroTimer;