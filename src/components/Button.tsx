import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {GestureResponderEvent} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {colors} from '../theme/colors';

interface Props {
  children: ReactNode;
  containerStyles?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
  accent?: boolean;
}

export default function Button({
  children,
  onPress,
  textStyles,
  containerStyles,
  accent,
}: Props) {
  const colorPalette = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: accent ? colorPalette.accent : colorPalette.surface,
        },
        containerStyles,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: accent ? colors.white : colorPalette.text,
          },
          textStyles,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});
