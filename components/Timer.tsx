"use client"
// components/Timer.tsx

import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { tasks, addTimeToTask } = useTaskContext();

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const handleTaskChange = (e) => {
    setTaskName(e.target.value);
  };

  const logTime = () => {
    if (taskName) {
      addTimeToTask(taskName, time);
      resetTimer();
    }
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      logTime();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <div>
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
      <div>{new Date(time * 1000).toISOString().substr(11, 8)}</div>
      <button onClick={toggleTimer} disabled={!taskName}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer} disabled={!taskName || !isActive}>
        Reset
      </button>
    </div>
  );
};

export default Timer;