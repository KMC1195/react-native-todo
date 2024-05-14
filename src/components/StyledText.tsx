import {Text, TextStyle, useColorScheme} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../theme/colors';

interface Props {
  children: ReactNode;
  styles?: TextStyle;
}

export default function StyledText({children, styles}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[
        {
          fontSize: 20,
          color: isDarkMode ? 'white' : colors.darkGray,
          fontFamily: 'Poppins-Regular',
        },
        styles,
      ]}>
      {children}
    </Text>
  );
}
