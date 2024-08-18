"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@/types';

const PomodoroTimer = () => {
  const { addTimeToTask } = useTaskContext();
  const { taskId, taskInput, handleTaskInputChange, handleTaskInputBlur, tasks } = useTaskManager();
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const logTime = useCallback(() => {
    if (taskId && time > 0) {
      const currentDate = new Date().toISOString().split('T')[0];
      addTimeToTask(taskId, time, 'Pomodoro');
      console.log(`Logging ${time} seconds for task ${taskId} on ${currentDate}`);
      setTime(0);
      setIsActive(false);
    } else if (!taskId) {
      console.error('No task selected');
    }
  }, [taskId, time, addTimeToTask]);

  const toggleTimer = useCallback(() => {
    setIsActive((prevIsActive) => {
      if (prevIsActive) {
        if (!isBreak) {
          logTime();
        }
        setIsBreak((prevIsBreak) => {
          setTime(prevIsBreak ? 1500 : 300);
          return !prevIsBreak;
        });
      } else {
        startTimeRef.current = Date.now();
      }
      return !prevIsActive;
    });
  }, [isBreak, logTime]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            if (isBreak) {
              // Use a more user-friendly notification method here
              console.log('Break over! Time to get back to work.');
              setIsBreak(false);
              return 1500;
            } else {
              console.log('Pomodoro session over! Time for a break.');
              logTime();
              setIsBreak(true);
              return 300;
            }
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