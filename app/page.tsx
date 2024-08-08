import Image from "next/image";
import styles from "./page.module.css";
import Timer from '../components/Timer';
import PomodoroTimer from '../components/PomodoroTimer';
import WeeklyTaskTable from '../components/WeeklyTaskTable';
import { TaskProvider } from '../context/TaskContext';

export default function Home() {
  return (
    <main>
      <TaskProvider>
      <div>
        <h1>Flexile Timer App</h1>
        <h2>Regular Timer</h2>
        <Timer />
        <h2>Pomodoro Timer</h2>
        <PomodoroTimer />
        <h2>Weekly Task Table</h2>
        <WeeklyTaskTable />
      </div>
    </TaskProvider>
    </main>
  );
}
