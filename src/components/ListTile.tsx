import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {Swipeable} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Project} from '../models/todos_models';
import {TrashIcon} from 'react-native-heroicons/outline';

interface Props {
  project: Project;
}

export default function ListTile({project}: Props) {
  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  function rightSwipe() {
    return (
      <View
        style={{
          backgroundColor: colors.lightRed,
          height: 60,
          flex: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
        }}>
        <TrashIcon color="white" strokeWidth={2} size={30} />
      </View>
    );
  }

  function onListTileDelete() {
    itemHeight.value = withTiming(0, {duration: 300});
    itemMarginBottom.value = withTiming(0, {duration: 300});
  }

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginBottom: itemMarginBottom.value,
    };
  });

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      onSwipeableOpen={onListTileDelete}>
      <Animated.View style={[styles.container, containerAnimatedStyles]}>
        <Text style={{fontSize: 20, color: colors.darkGray, fontWeight: '600'}}>
          {project.name}
        </Text>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
