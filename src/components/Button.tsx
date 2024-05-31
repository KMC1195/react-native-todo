import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {GestureResponderEvent} from 'react-native';
import {useTheme} from '../hooks/useTheme';

interface Props {
  children: ReactNode;
  containerStyles?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Button({
  children,
  onPress,
  textStyles,
  containerStyles,
}: Props) {
  const colorPalette = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: colorPalette.surface},
        containerStyles,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: colorPalette.text,
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
