export interface WorkInstance {
  startTime: string;
  duration: number;
  timerType: 'Pomodoro' | 'Regular';
}

export interface Task {
  id: string;
  name: string;
  totalTime: number;
  workInstances: WorkInstance[];
}

export interface TaskContextType {
  tasks: Task[];
  addTimeToTask: (taskId: string, timeSpent: number, timerType: 'Pomodoro' | 'Regular') => void;
  addTask: (name: string) => Task | null;
  updateTask: (id: string, name: string, date: string, time: number) => void;
  deleteTask: (id: string) => void;
}

export interface WeeklyTaskTableProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
}

export interface InputErrors {
  [key: string]: boolean;
}

export interface NewTaskLogs {
  [key: string]: string;
}

export interface StatsProps {
  totalMonthTime: number;
  hourlyRate: number;
}

export interface DashboardHeaderProps {
  currentMonth: string;
}