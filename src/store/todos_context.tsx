import React, {ReactNode, createContext, useEffect, useState} from 'react';
import {Project, Task, EditedProjectData} from '../types/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'items';

interface Props {
  children: ReactNode;
}

type TodosContextData = {
  items: Project[];
  deleteProject: (projectId: number) => void;
  toggleProjectCompletion: Function;
  createProject: Function;
  deleteTask: (projectIndex: number, taskId: number) => void;
  toggleTaskCompletion: Function;
  createTask: Function;
  editProject: Function;
};

export const TodosContext = createContext<TodosContextData | undefined>(
  undefined,
);

export default function TodosContextProvder({children}: Props) {
  const [items, setItems] = useState<Project[]>([]);

  const getData = async () => {
    try {
      const storageItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (storageItems !== null) {
        const JSONItems = JSON.parse(storageItems ? storageItems : '');
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

  function createProject(newProject: Project) {
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

  function editProject(projectId: number, newData: EditedProjectData) {
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

    const updatedTasks = currentTasks.map(item =>
      item.id === taskId ? {...item, completed: !item.completed} : item,
    );

    const temporaryItems = items.map((item, index) =>
      index === projectIndex ? {...item, tasks: updatedTasks} : item,
    );

    setItems(temporaryItems);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temporaryItems));
  }

  function createTask(projectId: number, newItem: Task) {
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
