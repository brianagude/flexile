"use client"

import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { startOfWeek, format, getMonth, getYear } from 'date-fns';
import DashboardHeader from './DashboardHeader';
import Stats from './Stats';
import Timer from './Timer';
import WeeklyTaskTable from './WeeklyTaskTable';

const DashboardManager = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [totalMonthTime, setTotalMonthTime] = useState<number>(0); // in seconds
  const hourlyRate = 100;
  const { tasks } = useTaskContext();

  // Update current month and total month time whenever the week changes
  useEffect(() => {
    const monday = currentWeek;
    const monthName = format(monday, 'MMMM');
    setCurrentMonth(monthName);

    // Calculate total time for the month
    const month = getMonth(monday);
    const year = getYear(monday);

    const totalTime = tasks.reduce((acc, task) => {
      const monthlyTotal = task.workInstances
        .filter(instance => {
          const instanceDate = new Date(instance.startTime);
          return getMonth(instanceDate) === month && getYear(instanceDate) === year;
        })
        .reduce((sum, instance) => sum + instance.duration, 0);
      return acc + monthlyTotal;
    }, 0);

    setTotalMonthTime(totalTime);
  }, [currentWeek, tasks]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
  };

  return (
    <>
      <DashboardHeader currentMonth={currentMonth} />
      <div className='page-wrapper'>
        <Stats totalMonthTime={totalMonthTime} hourlyRate={hourlyRate} />
        <Timer />
        <WeeklyTaskTable currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} />
      </div>
    </>
  );
};

export default DashboardManager;