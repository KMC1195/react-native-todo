import {ReactNode, createContext, useState} from 'react';
import {Project} from '../models/todos_models';

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
  addProject: (newProject: Project) => {},
});

export default function TodosContextProvder({children}: Props) {
  const [items, setItems] = useState([
    {
      name: 'Test 1',
      description: 'Desc',
      completed: false,
      datetime: new Date(),
      id: 0,
      tasks: [],
    },
    {
      name: 'Test 2',
      description: 'Desc',
      completed: false,
      datetime: new Date(),
      id: 1,
      tasks: [],
    },
    {
      name: 'Test 3',
      description: 'Desc',
      completed: false,
      datetime: new Date(),
      id: 2,
      tasks: [],
    },
  ]);

  function deleteProject(projectId: number) {
    let temporaryItems = [...items];
    temporaryItems = temporaryItems.filter(el => el.id !== projectId);
    setItems(temporaryItems);
  }

  function addProject(newProject: Project) {
    let temporaryItems = [...items];
    temporaryItems.push(newProject);
    setItems(temporaryItems);
  }

  const valueObject = {
    items: items,
    deleteProject,
    addProject,
  };
  return (
    <TodosContext.Provider value={valueObject}>
      {children}
    </TodosContext.Provider>
  );
}
