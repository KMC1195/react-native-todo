import {ReactNode, createContext, useState} from 'react';
import {Project, Task} from '../models/todos_models';

interface Props {
  children: ReactNode;
}

export const TodosContext = createContext({
  items: [
    {
      name: '',
      description: '',
      completed: false,
      datetime: new Date(),
      id: 0,
      tasks: [{name: '', completed: false, id: 0}],
    },
  ],
  deleteProject: (projectId: number) => {},
  toggleProjectCompletion: (projectId: number) => {},
  createProject: (newProject: Project) => {},
  deleteTask: (projectIndex: number, taskIndex: number) => {},
  toggleTaskCompletion: (projectIndex: number, taskIndex: number) => {},
  createTask: (projectId: number, newItem: Task) => {},
});

export default function TodosContextProvder({children}: Props) {
  const [items, setItems] = useState([
    {
      name: 'Test 1',
      description: 'Desc',
      completed: false,
      datetime: new Date(),
      id: 0,
      tasks: [
        {
          name: 'Feed the dog',
          completed: false,
          id: 0,
        },
      ],
    },
    {
      name: 'Test 2',
      description: 'Desc',
      completed: true,
      datetime: new Date(),
      id: 1,
      tasks: [],
    },
    {
      name: 'Test 3',
      description:
        'Et excepteur nisi nisi deserunt excepteur laborum duis. In velit consequat ut esse enim voluptate do. Officia ullamco non fugiat ad deserunt quis elit. Ullamco reprehenderit veniam tempor consectetur mollit consequat reprehenderit do. Esse do ea culpa nulla eiusmod Lorem incididunt sunt aute consequat aliquip labore sunt tempor.',
      completed: false,
      datetime: new Date(),
      id: 2,
      tasks: [
        {
          name: 'Walk the dog',
          id: 0,
          completed: false,
        },
        {
          name: 'Wash the dishes',
          id: 1,
          completed: true,
        },
        {
          name: 'Mow the yard',
          id: 2,
          completed: true,
        },
      ],
    },
  ]);

  function deleteProject(projectId: number) {
    let temporaryItems = [...items];
    temporaryItems = temporaryItems.filter(el => el.id !== projectId);
    setItems(temporaryItems);
  }

  function createProject(newProject: Project) {
    let temporaryItems = [...items];
    temporaryItems.push(newProject);
    setItems(temporaryItems);
  }

  function toggleProjectCompletion(projectId: number) {
    const projectIndex = items.findIndex(el => el.id === projectId);
    const updatedItems = items.map((item, index) =>
      index === projectIndex
        ? {...item, completed: !items[index].completed}
        : item,
    );

    setItems(updatedItems);
  }

  function deleteTask(projectIndex: number, taskId: number) {
    let temporaryItems = items.map(item => item);
    let currentTasks = temporaryItems[projectIndex].tasks;
    currentTasks = currentTasks.filter(el => el.id !== taskId);
    temporaryItems = temporaryItems.map((item, index) =>
      index === projectIndex ? {...item, tasks: currentTasks} : item,
    );
    setItems(temporaryItems);
  }

  function toggleTaskCompletion(projectIndex: number, taskId: number) {
    let currentTasks = items[projectIndex].tasks.map(item => item);

    const updatedTasks = currentTasks.map((item, index) =>
      item.id === taskId ? {...item, completed: !item.completed} : item,
    );

    const temporaryItems = items.map((item, index) =>
      index === projectIndex ? {...item, tasks: updatedTasks} : item,
    );

    setItems(temporaryItems);
  }

  function createTask(projectId: number, newItem: Task) {
    const index = items.findIndex(el => el.id === projectId);

    const currentTasks = items[index].tasks.map(item => item);
    currentTasks.push(newItem);

    const temporaryItems = items.map(item =>
      item.id === projectId ? {...item, tasks: currentTasks} : item,
    );

    setItems(temporaryItems);
  }

  const valueObject = {
    items,
    deleteProject,
    createProject,
    toggleProjectCompletion,
    deleteTask,
    toggleTaskCompletion,
    createTask,
  };
  return (
    <TodosContext.Provider value={valueObject}>
      {children}
    </TodosContext.Provider>
  );
}
