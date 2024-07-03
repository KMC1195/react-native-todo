import {useColorScheme} from 'react-native';
import {colors} from '../theme/colors';
import useTheme from './useTheme';

const darkTheme = {
  backround: colors.darkGray,
  surface: colors.middleGray,
  text: colors.white,
  accent: colors.pink,
};

const lightTheme = {
  backround: colors.white,
  surface: colors.lightGray,
  text: colors.darkGray,
  accent: colors.pink,
};

export function useColors() {
  const {theme} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  if (theme === 'light') {
    return lightTheme;
  } else if (theme === 'dark') {
    return darkTheme;
  }

  return isDarkMode ? darkTheme : lightTheme;
}
