"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { Task, TaskContextType } from '@/types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (name: string) => {
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
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id === taskId) {
        const existingWorkInstance = task.workInstances.find((instance) =>
          instance.startTime.startsWith(currentDate)
        );

        if (existingWorkInstance) {
          existingWorkInstance.duration += time;
        } else {
          task.workInstances.push({
            startTime: `${currentDate}T00:00:00`,
            duration: time,
            timerType,
          });
        }

        task.totalTime = task.workInstances.reduce((acc, instance) => acc + instance.duration, 0);

        console.log(`Added ${time} seconds to task ${task.name} for ${currentDate}. New total: ${task.totalTime}`);
      }
      return task;
    })
  );
};

  const updateTask = (id: string, name: string, date: string, time: number) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id === id) {
        const updatedName = name.trim() !== '' ? name : task.name;
        const workInstance = task.workInstances.find((instance) =>
          instance.startTime.startsWith(date)
        );
        if (workInstance) {
          workInstance.duration = time;
        } else {
          task.workInstances.push({
            startTime: `${date}T00:00:00`,
            duration: time,
            timerType: 'Regular',
          });
        }
        return {
          ...task,
          name: updatedName,
          totalTime: task.workInstances.reduce((acc, instance) => acc + instance.duration, 0),
        };
      }
      return task;
    })
  );
};

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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