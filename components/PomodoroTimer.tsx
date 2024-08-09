"use client"

import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const PomodoroTimer = () => {
  const { tasks, addTimeToTask, addTask } = useTaskContext(); // Ensure addTask is included here
  const [time, setTime] = useState(1500); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');

  const toggleTimer = () => {
    if (taskId) {
      setIsActive(!isActive);
    }
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
        setTaskId(newTask.id);
      }
    } else {
      setTaskId(null); // Reset taskId if the input is empty or invalid
    }
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
    if (taskId && !isBreak) {
      addTimeToTask(taskId, 1500 - time, 'Pomodoro'); // Log the time spent during focus session
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
  }, [isActive, time]);

  return (
    <div className='timer pomodoro-timer'>
      <div className='countdown-buttons'>
        <div className='countdown'>
          {new Date(time * 1000).toISOString().substr(14, 5)}
          <span>{isBreak ? 'Break' : 'Focus'}</span>
        </div>
        <div className='buttons'>
          <button onClick={toggleTimer} disabled={!taskId}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={startBreak} disabled={!taskId}>
            {isBreak ? 'Focus' : 'Break'}
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
        {tasks.map((task) => (
          <option key={task.id} value={task.name} />
        ))}
      </datalist>      
    </div>
  );
};

export default PomodoroTimer;