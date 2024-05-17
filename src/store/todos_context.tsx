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
  toggleProjectCompletion: (projectId: number) => {},
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
      tasks: [
        {
          name: '',
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

  function toggleProjectCompletion(projectId: number) {
    const projectIndex = items.findIndex(el => el.id === projectId);
    const updatedItems = items.map((item, index) =>
      index === projectIndex
        ? {...item, completed: !items[index].completed}
        : item,
    );

    setItems(updatedItems);
  }

  const valueObject = {
    items,
    deleteProject,
    addProject,
    toggleProjectCompletion,
  };
  return (
    <TodosContext.Provider value={valueObject}>
      {children}
    </TodosContext.Provider>
  );
}
