"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@/types';

const RegularTimer = () => {
  const { addTimeToTask } = useTaskContext();
  const { taskId, taskInput, handleTaskInputChange, handleTaskInputBlur, tasks } = useTaskManager();
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const toggleTimer = () => {
    if (taskId) {
      setIsActive((prevState) => !prevState);
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const logTime = useCallback(() => {
    if (taskId && time > 0) {
      addTimeToTask(taskId, time, 'Regular');
      resetTimer();
    }
  }, [taskId, time, addTimeToTask]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time > 0) {
      logTime();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, logTime, time]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className='timer regular-timer'>
      <div className='countdown-button'>
        <div className='countdown'>{formatTime(time)}</div>
          <button onClick={toggleTimer} disabled={!taskId} className='timer-btn'>
            {isActive ? 'Stop' : 'Start'}
          </button>
      </div>

      <input
        type="text"
        placeholder="What are you working on?"
        list="tasks"
        value={taskInput}
        onChange={handleTaskInputChange}
        onBlur={handleTaskInputBlur}
      />
      <datalist id="tasks">
        {tasks.map((task: Task) => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>
    </div>
  );
};

export default RegularTimer;