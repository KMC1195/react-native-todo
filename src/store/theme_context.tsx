import React, {ReactNode} from 'react';
import {createContext, useState} from 'react';

type ThemeContextData = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextData | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export default function ThemeContextProvder({children}: Props) {
  const [theme, setTheme] = useState('synced with your device');

  const data = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}
