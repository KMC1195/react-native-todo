import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {Swipeable} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Project, Task} from '../types/Todos';
import {TrashIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import Checkbox from './Checkbox';
import {useTodos} from '../hooks/useTodos';
import {useTheme} from '../hooks/useTheme';

interface Props {
  project: Project;
  task: Task;
}

export default function TaskListTile({project, task}: Props) {
  const colorPalette = useTheme();
  const {items, deleteTask, toggleTaskCompletion} = useTodos();
  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  const projectIndex = items.findIndex(el => el.id === project.id);

  function rightSwipe() {
    return (
      <View
        style={[
          styles.swipeContainer,
          {
            backgroundColor: colorPalette.accent,
          },
        ]}>
        <TrashIcon color={colors.white} strokeWidth={2} size={30} />
      </View>
    );
  }

  function onListTileDelete() {
    itemHeight.value = withTiming(0, {duration: 300}, () => {
      runOnJS(deleteTask)(projectIndex, task.id);
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
          {
            backgroundColor: colorPalette.surface,
          },
        ]}>
        <Checkbox
          value={task.completed}
          onChanged={() => toggleTaskCompletion(projectIndex, task.id)}
        />
        <StyledText
          weight="semiBold"
          textStyles={[
            styles.text,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              textDecorationLine: task.completed ? 'line-through' : 'none',
            },
          ]}>
          {task.name}
        </StyledText>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  text: {
    flex: 1,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  swipeContainer: {
    height: 60,
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
