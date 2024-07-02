import {useColorScheme} from 'react-native';
import {colors} from '../theme/colors';

const darkTheme = {
  backround: colors.darkGray,
  surface: colors.middleGray,
  text: colors.white,
  danger: colors.darkRed,
};

const lightTheme = {
  backround: colors.white,
  surface: colors.lightGray,
  text: colors.darkGray,
  danger: colors.lightRed,
};

export function useTheme() {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
}
