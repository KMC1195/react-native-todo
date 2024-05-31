import {useColorScheme} from 'react-native';
import {colors} from '../theme/colors';

export function useTheme() {
  const isDarkMode = useColorScheme() === 'dark';

  const colorPalette = {
    backround: isDarkMode ? colors.darkGray : colors.white,
    surface: isDarkMode ? colors.middleGray : colors.lightGray,
    text: isDarkMode ? colors.white : colors.darkGray,
    danger: isDarkMode ? colors.darkRed : colors.lightRed,
  };

  return colorPalette;
}
