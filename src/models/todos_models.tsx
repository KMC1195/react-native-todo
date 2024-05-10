export interface Task {
  name: string;
  completed: boolean;
  id: number;
}

export interface Project {
  name: string;
  description: string;
  completed: boolean;
  id: number;
  tasks: Task[];
}
