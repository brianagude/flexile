"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { useTaskManager } from '@/hooks/useTaskManager';
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

  const logTime = useCallback(() => {
    if (taskId && time > 0) {
      addTimeToTask(taskId, time, 'Regular');
      console.log(`Logging ${time} seconds for task ${taskId}`);
      setTime(0);
      setIsActive(false);
    } else if (!taskId) {
      console.error('No task selected');
    }
  }, [taskId, time, addTimeToTask]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => Math.max(prevTime + 1, 0));
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
  <div className='border border-gray rounded-2xl p-4 md:p-6 mt-3 md:mt-4'>
    <div className='grid grid-cols-2 gap-3 items-center'>
      <div className='font-bold text-2xl leading-none capitalize text-center'>
        <span className='block' aria-live="polite">{formatTime(time)}</span>
        <span className='block text-gray text-xs font-bold mt-1'>Time</span>
      </div>
      <button 
        onClick={toggleTimer} 
        disabled={!taskId} 
        className='text-black text-sm capitalize rounded border border-gray py-3 px-3 hover:bg-gray-light disabled:bg-gray-lightest disabled:border-gray-med disabled:text-gray disabled:cursor-not-allowed'
        aria-label={isActive ? 'Stop Timer' : 'Start Timer'}
      >
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
      aria-label="Current task"
      className='mt-3 w-full rounded border border-gray p-3'
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