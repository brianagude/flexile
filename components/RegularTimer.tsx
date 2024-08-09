"use client"

import { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';

const RegularTimer = () => {
  const { tasks, addTimeToTask, addTask } = useTaskContext();
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');

  const toggleTimer = () => {
    if (taskId) {
      setIsActive((prevState) => !prevState);
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleTaskInputBlur = () => {
    const trimmedTaskName = taskInput.trim();

    if (trimmedTaskName) {
      const existingTask = tasks.find((task) => task.name === trimmedTaskName);

      if (existingTask) {
        setTaskId(existingTask.id);
      } else {
        const newTask = addTask(trimmedTaskName);
        if (newTask) {
          setTaskId(newTask.id);
          console.log("New task created:", newTask);
        }
      }
    } else {
      setTaskId(null); // Reset taskId if the input is empty or invalid
    }
  };

  const logTime = useCallback(() => {
    if (taskId && time > 0) {
      addTimeToTask(taskId, time, 'Regular');
      console.log("Time logged:", { taskId, timeSpent: time });
      resetTimer();
    }
  }, [taskId, time, addTimeToTask]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increase time by 1 second
      }, 1000); // Update every second
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
      <div className='countdown-buttons'>
        <div className='countdown'>{formatTime(time)}</div>
        <div className='buttons'>
          <button onClick={toggleTimer} disabled={!taskId}>
            {isActive ? 'Stop' : 'Start'}
          </button>
        </div>
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
        {tasks.map(task => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>
    </div>
  );
};

export default RegularTimer;