import React, {ReactNode} from 'react';
import {createContext} from 'react';
import {applicationTheme} from '../types/Theme';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

type ThemeContextData = {
  theme: string;
  setAppTheme: Function;
};

export const ThemeContext = createContext<ThemeContextData | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export default function ThemeContextProvder({children}: Props) {
  const {items: theme, setData} = useAsyncStorage(
    'theme',
    'light' as applicationTheme,
  );

  function setAppTheme(colors: applicationTheme) {
    setData(colors);
  }

  const data = {
    theme,
    setAppTheme,
  };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}
