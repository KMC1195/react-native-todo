import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {CheckIcon} from 'react-native-heroicons/outline';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {useTheme} from '../hooks/useTheme';

interface Props {
  value: boolean;
  style?: ViewStyle | ViewStyle[];
  onChanged: () => void;
}

export default function Checkbox({value, onChanged, style}: Props) {
  const colorPalette = useTheme();

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onChanged)();
  });

  return (
    <GestureDetector gesture={tap}>
      <View
        style={[
          styles.container,
          {backgroundColor: colorPalette.surface},
          style,
        ]}>
        {value && <CheckIcon color={colorPalette.text} strokeWidth={3.5} />}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
