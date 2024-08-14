"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@/types';

const PomodoroTimer = () => {
  const { addTimeToTask } = useTaskContext();
  const { taskId, taskInput, handleTaskInputChange, handleTaskInputBlur, tasks } = useTaskManager();
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const logTime = useCallback(() => {
    if (taskId && !isBreak) {
      const timeSpent = 1500 - time;
      if (timeSpent > 0) {
        addTimeToTask(taskId, timeSpent, 'Pomodoro');
      }
    }
  }, [taskId, isBreak, time, addTimeToTask]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);

    if (isActive) {
      if (!isBreak) {
        logTime();
      }

      if (!isBreak) {
        setIsBreak(true);
        setTime(300); // Set break time to 5 minutes
      } else {
        setIsBreak(false);
        setTime(1500); // Set focus time to 25 minutes
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
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
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, logTime]);

  return (
    <div className='timer pomodoro-timer'>
      <div className='countdown-button'>
        <div className='countdown'>
          {new Date(time * 1000).toISOString().substr(14, 5)}
          <span>{isBreak ? 'Break' : 'Focus'}</span>
        </div>
        <button onClick={toggleTimer} disabled={!taskId} className='timer-btn'>
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