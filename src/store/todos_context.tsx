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
      id: 0,
      tasks: [{name: '', completed: false, id: 0}],
    },
  ],
});

export default function TodosContextProvder({children}: Props) {
  const [items, setItems] = useState([
    {
      name: 'Test 1',
      description: 'Desc',
      completed: false,
      id: 0,
      tasks: [],
    },
    {
      name: 'Test 2',
      description: 'Desc',
      completed: false,
      id: 1,
      tasks: [],
    },
    {
      name: 'Test 3',
      description: 'Desc',
      completed: false,
      id: 2,
      tasks: [],
    },
  ]);

  const valueObject = {
    items: items,
  };
  return (
    <TodosContext.Provider value={valueObject}>
      {children}
    </TodosContext.Provider>
  );
}
