import {View, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {useColors} from '../hooks/useColors';

interface Props {
  style?: ViewStyle;
}

export default function Separator({style}: Props) {
  const colorPalette = useColors();

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
