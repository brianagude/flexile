import { TaskProvider } from '../context/TaskContext';
import DashboardManager from '@/components/DashboardManager';
import "@/styles/pages/tracking.scss";

export default function Home() {
  return (
    <TaskProvider>
        <DashboardManager />
    </TaskProvider>
  );
}