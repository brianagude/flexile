import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '@/types';

export const useTaskManager = () => {
  const { tasks, addTask, updateTaskTime, addTimeToTask } = useTaskContext();
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleTaskInputBlur = () => {
    const trimmedTaskName = taskInput.trim();

    if (trimmedTaskName) {
      const existingTask = tasks.find((task: Task) => task.name === trimmedTaskName);

      if (existingTask) {
        setTaskId(existingTask.id);
      } else {
        const newTask = addTask(trimmedTaskName);
        if (newTask) {
          setTaskId(newTask.id);
          console.log("New task created:", newTask);
        } else {
          console.error("Failed to create new task");
          // Optionally, show an error message to the user
        }
      }
    } else {
      setTaskId(null);
    }
  };

  const updateTaskInputFromTimer = (id: string, date: string, time: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskId(id);
      setTaskInput(task.name);
      updateTaskTime(id, date, time);
    }
  };

  return { taskId, taskInput, handleTaskInputChange, handleTaskInputBlur, tasks, updateTaskInputFromTimer, addTimeToTask };
};