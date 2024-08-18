"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@/types';

const PomodoroTimer = () => {
  const { addTimeToTask } = useTaskContext();
  const { taskId, taskInput, handleTaskInputChange, handleTaskInputBlur, tasks } = useTaskManager();
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const logTime = useCallback(() => {
    if (taskId && startTimeRef.current) {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      addTimeToTask(taskId, elapsedTime, 'Pomodoro');
      console.log(`Logging ${elapsedTime} seconds for task ${taskId}`);
      setTime(isBreak ? 300 : 1500); // Reset to 5 or 25 minutes
      startTimeRef.current = undefined;
    } else if (!taskId) {
      console.error('No task selected');
    }
  }, [taskId, isBreak, addTimeToTask]);

  const toggleTimer = useCallback(() => {
    setIsActive((prevIsActive) => {
      if (prevIsActive) {
        logTime();
        setIsBreak((prevIsBreak) => !prevIsBreak);
      } else {
        startTimeRef.current = Date.now();
      }
      return !prevIsActive;
    });
  }, [logTime]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            logTime();
            setIsBreak((prevIsBreak) => !prevIsBreak);
            return isBreak ? 1500 : 300; // Switch to 25 or 5 minutes
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreak, logTime]);

  return (
    <div className='timer pomodoro-timer'>
      <div className='countdown-button'>
        <div className='countdown' aria-live="polite">
          {new Date(time * 1000).toISOString().substr(14, 5)}
          <span>{isBreak ? 'Break' : 'Focus'}</span>
        </div>
        <button 
          onClick={toggleTimer} 
          disabled={!taskId} 
          className='timer-btn'
          aria-label={isActive ? (isBreak ? 'End Break' : 'End Focus') : (isBreak ? 'Start Break' : 'Start Focus')}
        >
          {isActive ? (isBreak ? 'End Break' : 'End Focus') : (isBreak ? 'Start Break' : 'Start Focus')}
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
      />
      <datalist id="tasks">
        {tasks.map((task: Task) => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>
    </div>
  );
};

export default PomodoroTimer;