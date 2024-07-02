import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CheckIcon} from 'react-native-heroicons/outline';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {useTheme} from '../hooks/useTheme';
import {colors} from '../theme/colors';

interface Props {
  value: boolean;
  onChanged: () => void;
}

export default function Checkbox({value, onChanged}: Props) {
  const colorPalette = useTheme();

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onChanged)();
  });

  return (
    <GestureDetector gesture={tap}>
      <View style={[styles.container, {backgroundColor: colorPalette.accent}]}>
        {value && <CheckIcon color={colors.white} strokeWidth={3.5} />}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
