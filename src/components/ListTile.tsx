import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../theme/colors';
import {Swipeable} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Project} from '../models/todos_models';
import {TrashIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import {TodosContext} from '../store/todos_context';

interface Props {
  project: Project;
}

export default function ListTile({project}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const todos = useContext(TodosContext);

  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  function rightSwipe() {
    return (
      <View
        style={{
          backgroundColor: isDarkMode ? colors.darkRed : colors.lightRed,
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
    itemHeight.value = withTiming(0, {duration: 300}, () => {
      runOnJS(todos.deleteProject)(project.id);
    });
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
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyles,
          {backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray},
        ]}>
        <StyledText styles={{fontWeight: '600'}}>{project.name}</StyledText>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
