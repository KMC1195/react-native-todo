import {useColorScheme} from 'react-native';
import {colors} from '../theme/colors';

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

export function useTheme() {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
}
