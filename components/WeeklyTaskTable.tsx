"use client";

import { useTaskContext } from '../context/TaskContext';
import { useState, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import ArrowRight from '@/components/icon-arrow-right';
import ArrowLeft from '@/components/icon-arrow-left';
import Trash from '@/components/icon-trash';
import { Task, WeeklyTaskTableProps, InputErrors, NewTaskLogs } from '@/types';

const WeeklyTaskTable = ({ currentWeek, setCurrentWeek }: WeeklyTaskTableProps) => {
  const { tasks, updateTask, addTask, deleteTask, updateTaskTime } = useTaskContext();
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskLogs, setNewTaskLogs] = useState<NewTaskLogs>({});
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const [editingValues, setEditingValues] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // This effect will run whenever tasks are updated
    console.log('Tasks updated:', tasks);
    // Force re-render
    setInputErrors((prevErrors) => ({ ...prevErrors }));
  }, [tasks]);

  const getWeekDays = (startDate: Date): Date[] => {
    return Array.from({ length: 7 }).map((_, index) => addDays(startDate, index));
  };

  const weekDays = getWeekDays(currentWeek);

  const changeWeek = (offset: number) => {
    setCurrentWeek(addDays(currentWeek, offset * 7));
  };

  const handleTaskNameChange = (id: string, newName: string) => {
    const currentDate = new Date().toISOString().split('T')[0];
    updateTask(id, newName, currentDate, 0);
  };

  const handleTimeBlur = (id: string, date: string, newTime: string, currentName: string) => {
    const inputKey = `${id}-${date}`;

    if (newTime.trim() === '') {
      updateTask(id, currentName, date, 0);
      setInputErrors((prev) => ({ ...prev, [inputKey]: false }));
      return;
    }

    const timeParts = newTime.split(':');

    if (timeParts.length === 2 && timeParts.every((part) => /^\d+$/.test(part))) {
      const [hours, minutes] = timeParts;
      const timeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;

      if (!isNaN(timeInSeconds)) {
        updateTask(id, currentName, date, timeInSeconds);
        setInputErrors((prev) => ({ ...prev, [inputKey]: false }));
      } else {
        setInputErrors((prev) => ({ ...prev, [inputKey]: true }));
      }
    } else {
      setInputErrors((prev) => ({ ...prev, [inputKey]: true }));
    }
  };

  const handleTimeChange = (id: string, date: string, newValue: string) => {
    const inputKey = `${id}-${date}`;
    setEditingValues(prev => ({ ...prev, [inputKey]: newValue }));
  };

  const handleTimeSubmit = (id: string, date: string, newValue: string) => {
    const timeParts = newValue.split(':');
    if (timeParts.length === 2 && timeParts.every((part) => /^\d+$/.test(part))) {
      const [hours, minutes] = timeParts;
      const timeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
      if (!isNaN(timeInSeconds)) {
        updateTaskTime(id, date, timeInSeconds);
        setInputErrors(prev => ({ ...prev, [`${id}-${date}`]: false }));
      } else {
        setInputErrors(prev => ({ ...prev, [`${id}-${date}`]: true }));
      }
    } else {
      setInputErrors(prev => ({ ...prev, [`${id}-${date}`]: true }));
    }
    // Clear the editing value
    setEditingValues(prev => {
      const newValues = { ...prev };
      delete newValues[`${id}-${date}`];
      return newValues;
    });
  };

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleNewTaskTimeChange = (date: string, newTime: string) => {
    setNewTaskLogs((prevLogs) => ({ ...prevLogs, [date]: newTime }));
  };

  const addNewTask = () => {
    if (newTaskName.trim() !== '') {
      try {
        const newTask = addTask(newTaskName);

        if (newTask) {
          Object.keys(newTaskLogs).forEach((date) => {
            const timeParts = newTaskLogs[date].split(':');
            if (timeParts.length === 2 && timeParts.every((part) => /^\d+$/.test(part))) {
              const [hours, minutes] = timeParts;
              const timeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
              if (!isNaN(timeInSeconds)) {
                updateTask(newTask.id, newTaskName, date, timeInSeconds);
              }
            }
          });

          setNewTaskName('');
          setNewTaskLogs({});
        } else {
          console.error('Failed to create new task');
          // Optionally, show an error message to the user
        }
      } catch (error) {
        console.error('Error creating new task:', error);
        // Optionally, show an error message to the user
      }
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
  <div className='border border-gray rounded-2xl md:col-span-2'>
    <table className='w-full'>
      <thead>
        <tr className='grid grid-cols-[1fr_auto_auto] lg:grid-cols-[1fr_repeat(7,minmax(0,80px))_auto] gap-3 md:gap-6 p-3'>
          <th className='text-gray text-sm capitalize flex items-center'>
            <ArrowLeft onClick={() => changeWeek(-1)} />
          </th>
          {weekDays.map((day) => (
            <th key={day.toISOString()} className='text-gray text-sm capitalize text-center hidden lg:flex lg:flex-col lg:gap-3'>
              {format(day, 'EEE')}
              <span>{format(day, 'MMM d')}</span>
            </th>
          ))}
          
          <th className='text-gray text-sm capitalize flex items-center'>
            <ArrowRight onClick={() => changeWeek(1)} className="cursor-pointer" />
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className='grid grid-cols-[auto_auto_auto] md:grid-cols-[repeat(7,minmax(0,80px))_40px] lg:grid-cols-[1fr_repeat(7,minmax(0,80px))_40px] gap-3 md:gap-6 p-3 border-t border-gray'>
            <td className='col-span-full lg:col-auto'>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleTaskNameChange(task.id, e.target.value)}
                className='w-full rounded border border-gray p-2 text-center'
              />
            </td>
            {weekDays.map((day) => {
              const date = format(day, 'yyyy-MM-dd');
              const workInstance = task.workInstances.find(
                (instance) => instance.startTime.startsWith(date)
              );
              const timeValue = workInstance
                ? formatTime(workInstance.duration)
                : '';
              const inputKey = `${task.id}-${date}`;
              const inputClass = inputErrors[inputKey] ? 'border-red-500' : '';
              const editingValue = editingValues[inputKey];

              return (
                <td key={day.toISOString()}>
                  <span className='block mb-2 lg:hidden'>{format(day, 'MMM d')}</span>
                  <input
                    type="text"
                    placeholder="HH:MM"
                    value={editingValue !== undefined ? editingValue : timeValue}
                    className={`w-full rounded border border-gray p-2 text-center ${inputClass}`}
                    onChange={(e) => handleTimeChange(task.id, date, e.target.value)}
                    onBlur={(e) => handleTimeSubmit(task.id, date, e.target.value)}
                    onFocus={(e) => {
                      if (!editingValues[inputKey]) {
                        setEditingValues(prev => ({ ...prev, [inputKey]: timeValue }));
                      }
                    }}
                  />
                </td>
              );
            })}
            <td>
              <button onClick={() => deleteTask(task.id)} className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue'>
                <Trash />
              </button>
            </td>
          </tr>
        ))}
        <tr className='grid grid-cols-[auto_auto_auto] md:grid-cols-[repeat(7,minmax(0,80px))_40px] lg:grid-cols-[1fr_repeat(7,minmax(0,80px))_40px] gap-3 md:gap-6 p-3 border-t border-gray'>
          <td className='col-span-full lg:col-auto'>
            <input
              type="text"
              placeholder="New Task"
              value={newTaskName}
              onChange={handleNewTaskChange}
              onBlur={addNewTask}
              className='w-full rounded border border-gray p-2 text-left'
            />
          </td>
          {weekDays.map((day) => (
            <td key={day.toISOString()}>
              <span className='block mb-2 lg:hidden'>{format(day, 'MMM d')}</span>
              <input
                type="text"
                placeholder="HH:MM"
                disabled={!newTaskName}
                value={newTaskLogs[format(day, 'yyyy-MM-dd')] || ''}
                onChange={(e) =>
                  handleNewTaskTimeChange(format(day, 'yyyy-MM-dd'), e.target.value)
                }
                className='w-full rounded border border-gray p-2 text-left disabled:bg-gray-lightest disabled:border-gray-med disabled:text-gray'
              />
            </td>
          ))}
          <td>
            <button disabled className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue'>
              <Trash />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr className='grid grid-cols-[auto_auto_auto] md:grid-cols-[1fr_repeat(7,minmax(0,80px))_40px] gap-3 md:gap-6 p-3 border-t border-gray'>
          <td className='hidden lg:block'></td>
          {weekDays.map((day) => {
            const totalTime = tasks.reduce((acc, task) => {
              const date = format(day, 'yyyy-MM-dd');
              const dailyTotal = task.workInstances
                .filter((instance) => instance.startTime.startsWith(date))
                .reduce((sum, instance) => sum + instance.duration, 0);
              return acc + dailyTotal;
            }, 0);
            return (
              <td key={day.toISOString()} className='text-center'>
                <span className='block mb-2 lg:hidden'>{format(day, 'MMM d')}</span>
                {totalTime > 0 ? formatTime(totalTime) : '—'}
              </td>
            );
          })}
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
);
};

export default WeeklyTaskTable;