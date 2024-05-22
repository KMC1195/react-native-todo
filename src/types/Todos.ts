export interface ITaskProps {
  name: string;
  completed: boolean;
  id: number;
}

export interface IProjectProps {
  name: string;
  description: string;
  datetime: Date;
  completed: boolean;
  id: number;
  tasks: ITaskProps[];
}

export interface IEditedProjectDataProps {
  name: string;
  description: string;
  datetime: Date;
}
