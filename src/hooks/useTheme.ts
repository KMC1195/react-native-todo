import {useContext} from 'react';
import {ThemeContext} from '../store/theme_context';

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme should be used only within ThemeContextProvider');
  }

  return context;
}
