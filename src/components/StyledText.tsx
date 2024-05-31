import {StyleSheet, Text, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '../hooks/useTheme';

const weightMap = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
} as const;

type FontWeight = keyof typeof weightMap;

interface Props {
  children: ReactNode;
  textStyles?: TextStyle | TextStyle[];
  weight?: FontWeight;
}

export default function StyledText({children, textStyles, weight}: Props) {
  const colorPalette = useTheme();

  return (
    <Text
      style={[
        styles.text,
        {
          color: colorPalette.text,
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
