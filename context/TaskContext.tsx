"use client"
// context/TaskContext.tsx

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface WorkInstance {
  startTime: string;
  duration: number;
  timerType: 'Pomodoro' | 'Regular';
}

interface Task {
  id: string;
  name: string;
  totalTime: number;
  workInstances: WorkInstance[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string) => void;
  updateTask: (id: string, name: string, date: string, time: number) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      totalTime: 0,
      workInstances: [], // Ensure workInstances is initialized
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, name: string, date: string, time: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          task.name = name;
          task.workInstances = task.workInstances || []; // Ensure workInstances is defined
          const workInstance = task.workInstances.find(instance => instance.startTime.startsWith(date));
          if (workInstance) {
            workInstance.duration = time;
          } else {
            task.workInstances.push({ startTime: `${date}T00:00:00`, duration: time, timerType: 'Regular' });
          }
          task.totalTime = task.workInstances.reduce((acc, instance) => acc + instance.duration, 0);
        }
        return task;
      });
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
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