import React, {ReactNode} from 'react';
import {createContext, useState} from 'react';

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
  const [theme, setTheme] = useState('synced with your device');

  function setAppTheme(appTheme: 'light' | 'dark' | 'sync with device') {
    setTheme(appTheme);
  }

  const data = {
    theme,
    setAppTheme,
  };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}
