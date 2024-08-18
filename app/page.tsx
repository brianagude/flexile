import { TaskProvider } from '../context/TaskContext';
import DashboardManager from '@/components/DashboardManager';

export default function Home() {
  return (
    <TaskProvider>
      <DashboardManager />
    </TaskProvider>
  );
}