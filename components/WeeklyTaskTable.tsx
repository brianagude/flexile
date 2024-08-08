"use client"
// components/WeeklyTaskTable.tsx

import { useTaskContext } from '../context/TaskContext';
import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';

const WeeklyTaskTable = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskLogs, setNewTaskLogs] = useState<{ [key: string]: string }>({});

  const getWeekDays = (startDate) => {
    return Array.from({ length: 7 }).map((_, index) => addDays(startDate, index));
  };

  const weekDays = getWeekDays(currentWeek);

  const changeWeek = (offset) => {
    setCurrentWeek(addDays(currentWeek, offset * 7));
  };

  const handleTaskNameChange = (id, newName) => {
    const currentDate = new Date().toISOString().split('T')[0];
    updateTask(id, newName, currentDate, 0); // Update task name, keeping the date and time the same
  };

  const handleTimeChange = (id, date, newTime) => {
    const timeInSeconds = newTime.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    updateTask(id, '', date, timeInSeconds); // Update task time, keeping the name the same
  };

  const handleNewTaskChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleNewTaskTimeChange = (date, newTime) => {
    setNewTaskLogs({ ...newTaskLogs, [date]: newTime });
  };

  const addNewTask = () => {
    if (newTaskName.trim() !== '') {
      const timeInSeconds = Object.keys(newTaskLogs).reduce((acc, date) => {
        const time = newTaskLogs[date].split(':').reduce((acc, time) => (60 * acc) + +time, 0);
        updateTask(Date.now().toString(), newTaskName, date, time);
        return acc + time;
      }, 0);
      setNewTaskName('');
      setNewTaskLogs({});
    }
  };

  return (
    <div>
      <button onClick={() => changeWeek(-1)}>Previous Week</button>
      <button onClick={() => changeWeek(1)}>Next Week</button>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            {weekDays.map((day) => (
              <th key={day.toISOString()} style={{ backgroundColor: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'yellow' : 'white' }}>
                {format(day, 'EEEE, MMM d')}
              </th>
            ))}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskNameChange(task.id, e.target.value)}
                />
              </td>
              {weekDays.map((day) => {
                const log = task.dailyLogs.find(log => log.date === format(day, 'yyyy-MM-dd'));
                return (
                  <td key={day.toISOString()}>
                    <input
                      type="text"
                      value={log ? new Date(log.time * 1000).toISOString().substr(11, 8) : '00:00:00'}
                      onChange={(e) => handleTimeChange(task.id, format(day, 'yyyy-MM-dd'), e.target.value)}
                    />
                  </td>
                );
              })}
              <td>
                <button onClick={() => deleteTask(task.id)}>X</button>
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
              />
            </td>
            {weekDays.map((day) => (
              <td key={day.toISOString()}>
                <input
                  type="text"
                  placeholder="00:00:00"
                  value={newTaskLogs[format(day, 'yyyy-MM-dd')] || ''}
                  onChange={(e) => handleNewTaskTimeChange(format(day, 'yyyy-MM-dd'), e.target.value)}
                />
              </td>
            ))}
            <td>
              <button onClick={addNewTask}>+</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            {weekDays.map((day) => {
              const totalTime = tasks.reduce((acc, task) => {
                const log = task.dailyLogs.find(log => log.date === format(day, 'yyyy-MM-dd'));
                return acc + (log ? log.time : 0);
              }, 0);
              return <td key={day.toISOString()}>{new Date(totalTime * 1000).toISOString().substr(11, 8)}</td>;
            })}
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WeeklyTaskTable;