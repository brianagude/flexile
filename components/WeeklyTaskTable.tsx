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
    <div className="task-table">
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => changeWeek(-1)}>
                <ArrowLeft />
              </button>
            </th>
            {weekDays.map((day) => (
              <th key={day.toISOString()}>
                <span>{format(day, 'EEE')}</span> <span>{format(day, 'd')}</span>
              </th>
            ))}
            <th>
              <button onClick={() => changeWeek(1)}>
                <ArrowRight />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskNameChange(task.id, e.target.value)}
                />
              </td>
              {weekDays.map((day) => {
                const date = format(day, 'yyyy-MM-dd');
                const log = task.workInstances.find((instance) =>
                  instance.startTime.startsWith(date)
                );
                const timeValue = log ? formatTime(log.duration) : '00:00';
                const inputKey = `${task.id}-${date}`;
                const inputClass = inputErrors[inputKey] ? 'error' : '';
                const editingValue = editingValues[inputKey];

                return (
                  <td key={day.toISOString()}>
                    <span>{format(day, 'MMM d')}</span>
                    <input
                      type="text"
                      placeholder="HH:MM"
                      value={editingValue !== undefined ? editingValue : timeValue}
                      className={inputClass}
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
                <button onClick={() => deleteTask(task.id)}>
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="New Task"
                value={newTaskName}
                onChange={handleNewTaskChange}
                onBlur={addNewTask}
              />
            </td>
            {weekDays.map((day) => (
              <td key={day.toISOString()}>
                <span>{format(day, 'MMM d')}</span>
                <input
                  type="text"
                  placeholder="HH:MM"
                  disabled={!newTaskName}
                  value={newTaskLogs[format(day, 'yyyy-MM-dd')] || ''}
                  onChange={(e) =>
                    handleNewTaskTimeChange(format(day, 'yyyy-MM-dd'), e.target.value)
                  }
                />
              </td>
            ))}
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            {weekDays.map((day) => {
              const totalTime = tasks.reduce((acc, task) => {
                const date = format(day, 'yyyy-MM-dd');
                const dailyTotal = task.workInstances
                  .filter((instance) => instance.startTime.startsWith(date))
                  .reduce((sum, instance) => sum + instance.duration, 0);
                return acc + dailyTotal;
              }, 0);
              return (
                <td key={day.toISOString()}>
                  <span>{format(day, 'MMM d')}</span>
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