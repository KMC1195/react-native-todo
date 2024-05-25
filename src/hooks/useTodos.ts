import {useContext} from 'react';
import {TodosContext} from '../store/todos_context';

export function useTodos() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos should be used only within TodosContextProvder');
  }

  return context;
}
