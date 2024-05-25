import {StyleSheet, Text, TextStyle, useColorScheme} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../theme/colors';

interface Props {
  children: ReactNode;
  textStyles?: TextStyle | TextStyle[];
  weight?: 'regular' | 'semiBold';
}

export default function StyledText({children, textStyles, weight}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const weightMap = {
    regular: 'Poppins-Regular',
    semiBold: 'Poppins-SemiBold',
  };

  return (
    <Text
      style={[
        styles.text,
        {
          color: isDarkMode ? colors.white : colors.darkGray,
          fontFamily: weight ? weightMap[weight] : weightMap.regular,
        },
        textStyles,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
