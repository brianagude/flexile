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
  addTimeToTask: (id: string, time: number, timerType: 'Pomodoro' | 'Regular') => void;
  addTask: (name: string) => Task | null;
  updateTask: (id: string, name: string, date: string, time: number) => void;
  deleteTask: (id: string) => void;
}

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