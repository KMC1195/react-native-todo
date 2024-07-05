import React, {createContext, ReactNode, useState} from 'react';
import {UserIcon} from 'react-native-heroicons/outline';
import {Category} from '../types/Categories';

type CategoriesContextReturnType = {
  categories: Category[];
};
export const CategoriesContext = createContext<
  CategoriesContextReturnType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export default function CategoriesContextProvider({children}: Props) {
  const [categories, setCategories] = useState<Category[]>([
    {name: 'Family', icon: <UserIcon />, id: 0},
  ]);

  const value = {categories};

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
