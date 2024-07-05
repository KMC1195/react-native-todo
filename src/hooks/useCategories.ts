import {useContext} from 'react';
import {CategoriesContext} from '../store/categories_context';

export default function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      'useCategories should be used only within CategoriesContextProvider',
    );
  }

  return context;
}
