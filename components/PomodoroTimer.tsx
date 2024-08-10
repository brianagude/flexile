"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';

const PomodoroTimer = () => {
  const { tasks, addTimeToTask, addTask } = useTaskContext();
  const [time, setTime] = useState(1500); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');

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
    if (taskId && !isBreak) {
      const timeSpent = 1500 - time;
      if (timeSpent > 0) {
        addTimeToTask(taskId, timeSpent, 'Pomodoro'); // Log the time spent during focus session
        console.log("Time logged:", { taskId, timeSpent });
      }
    }
  }, [taskId, isBreak, time, addTimeToTask]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);

    if (isActive) {
      // When pausing the timer or switching to break, log the time if in focus mode
      if (!isBreak) {
        logTime();
      }

      // If the timer is active and we pause it, switch modes
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
        {tasks.map((task) => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>
    </div>
  );
};

export default PomodoroTimer;