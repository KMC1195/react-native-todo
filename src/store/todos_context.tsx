import {ReactNode, createContext, useEffect, useState} from 'react';
import {
  TProjectProps,
  TTaskProps,
  TEditedProjectDataProps,
} from '../types/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const STORAGE_KEY = 'items';

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
  createProject: (newProject: TProjectProps) => {},
  deleteTask: (projectIndex: number, taskIndex: number) => {},
  toggleTaskCompletion: (projectIndex: number, taskIndex: number) => {},
  createTask: (projectId: number, newItem: TTaskProps) => {},
  editProject: (projectId: number, newData: TEditedProjectDataProps) => {},
});

export default function TodosContextProvder({children}: Props) {
  const [items, setItems] = useState<TProjectProps[]>([]);

  const getData = async () => {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEY);
      if (items !== null) {
        const JSONItems = JSON.parse(items ? items : '');
        setItems(JSONItems);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteProject(projectId: number) {
    let temporaryItems = [...items];
    temporaryItems = temporaryItems.filter(el => el.id !== projectId);
    setItems(temporaryItems);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  function createProject(newProject: TProjectProps) {
    let temporaryItems = [...items];
    temporaryItems.push(newProject);
    setItems(temporaryItems);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  function toggleProjectCompletion(projectId: number) {
    const projectIndex = items.findIndex(el => el.id === projectId);
    const updatedItems = items.map((item, index) =>
      index === projectIndex
        ? {...item, completed: !items[index].completed}
        : item,
    );

    setItems(updatedItems);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  }

  function editProject(projectId: number, newData: TEditedProjectDataProps) {
    const temporaryItems = items.map(item =>
      item.id === projectId
        ? {
            ...item,
            name: newData.name,
            description: newData.description,
            datetime: newData.datetime,
          }
        : item,
    );

    setItems(temporaryItems);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  function deleteTask(projectIndex: number, taskId: number) {
    let temporaryItems = items.map(item => item);
    let currentTasks = temporaryItems[projectIndex].tasks;
    currentTasks = currentTasks.filter(el => el.id !== taskId);
    temporaryItems = temporaryItems.map((item, index) =>
      index === projectIndex ? {...item, tasks: currentTasks} : item,
    );
    setItems(temporaryItems);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
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

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  function createTask(projectId: number, newItem: TTaskProps) {
    const index = items.findIndex(el => el.id === projectId);

    const currentTasks = items[index].tasks.map(item => item);
    currentTasks.push(newItem);

    const temporaryItems = items.map(item =>
      item.id === projectId ? {...item, tasks: currentTasks} : item,
    );

    setItems(temporaryItems);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  const valueObject = {
    items,
    deleteProject,
    createProject,
    toggleProjectCompletion,
    editProject,
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
