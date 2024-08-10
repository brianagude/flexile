"use client";

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
  addTimeToTask: (id: string, time: number, timerType: 'Pomodoro' | 'Regular') => void;
  addTask: (name: string) => Task | null;
  updateTask: (id: string, name: string, date: string, time: number) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHydrated, setIsHydrated] = useState(false); // Add hydration state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      setIsHydrated(true); // Mark as hydrated after localStorage is read
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isHydrated]);

  const addTask = (name: string): Task | null => {
    const trimmedName = name.trim();
    if (trimmedName === '') return null;

    const newTask: Task = {
      id: Date.now().toString(),
      name: trimmedName,
      totalTime: 0,
      workInstances: [],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  const addTimeToTask = (taskId: string, time: number, timerType: 'Pomodoro' | 'Regular') => {
    const currentDate = new Date().toISOString().split('T')[0];
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          let workInstance = task.workInstances.find((instance) =>
            instance.startTime.startsWith(currentDate)
          );

          if (workInstance) {
            workInstance.duration += time;
          } else {
            task.workInstances.push({
              startTime: `${currentDate}T00:00:00`,
              duration: time,
              timerType,
            });
          }

          task.totalTime = task.workInstances.reduce(
            (acc, instance) => acc + instance.duration,
            0
          );
        }
        return task;
      });
    });

    console.log('add time: ', tasks);
  };

  const updateTask = (id: string, name: string, date: string, time: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          task.name = name.trim() !== '' ? name : task.name;
          task.workInstances = task.workInstances || [];
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

    console.log('update time: ', tasks);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    console.log('delete time: ', tasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, addTimeToTask, updateTask, deleteTask }}>
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