import {StyleSheet, Text, View, useColorScheme, ViewStyle} from 'react-native';
import React from 'react';
import {CheckIcon} from 'react-native-heroicons/outline';
import {colors} from '../theme/colors';
import {GestureResponderEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

interface Props {
  value: boolean;
  style?: ViewStyle;
  onChanged: () => void;
}

export default function Checkbox({value, onChanged, style}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onChanged)();
  });

  return (
    <GestureDetector gesture={tap}>
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray},
          style,
        ]}>
        {value && (
          <CheckIcon
            color={isDarkMode ? 'white' : '#707070'}
            strokeWidth={3.5}
          />
        )}
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
