"use client"
// context/TaskContext.tsx

import { createContext, useState, useContext, ReactNode } from 'react';

interface DailyLog {
  date: string;
  time: number;
}

interface Task {
  id: string;
  name: string;
  totalTime: number;
  dailyLogs: DailyLog[];
}

interface TaskContextType {
  tasks: Task[];
  addTimeToTask: (name: string, time: number) => void;
  updateTask: (id: string, name: string, date: string, time: number) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const initialTasks: Task[] = [
    { id: '1', name: 'Task 1', totalTime: 3600, dailyLogs: [{ date: '2024-08-07', time: 3600 }] },
    { id: '2', name: 'Task 2', totalTime: 5400, dailyLogs: [{ date: '2024-08-07', time: 5400 }] },
    { id: '3', name: 'Task 3', totalTime: 1800, dailyLogs: [{ date: '2024-08-07', time: 1800 }] },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTimeToTask = (name: string, time: number) => {
    const currentDate = new Date().toISOString().split('T')[0];
    setTasks((prevTasks) => {
      const existingTask = prevTasks.find((task) => task.name === name);
      if (existingTask) {
        existingTask.totalTime += time;
        const dailyLog = existingTask.dailyLogs.find((log) => log.date === currentDate);
        if (dailyLog) {
          dailyLog.time += time;
        } else {
          existingTask.dailyLogs.push({ date: currentDate, time });
        }
        return [...prevTasks];
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          name: name,
          totalTime: time,
          dailyLogs: [{ date: currentDate, time }],
        };
        return [...prevTasks, newTask];
      }
    });
  };

  const updateTask = (id: string, name: string, date: string, time: number) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const task = prevTasks[taskIndex];
        task.name = name;
        const dailyLog = task.dailyLogs.find((log) => log.date === date);
        if (dailyLog) {
          dailyLog.time = time;
        } else {
          task.dailyLogs.push({ date, time });
        }
        task.totalTime = task.dailyLogs.reduce((acc, log) => acc + log.time, 0);
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = task;
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTimeToTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};