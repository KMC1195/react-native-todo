import {View, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

interface Props {
  style?: ViewStyle;
}

export default function Separator({style}: Props) {
  const colorPalette = useTheme();

  return (
    <View
      style={[styles.separator, {backgroundColor: colorPalette.text}, style]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 6,
    width: '100%',
    borderRadius: 10,
  },
});
