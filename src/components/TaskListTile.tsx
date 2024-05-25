import {View, StyleSheet, useColorScheme} from 'react-native';
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

interface Props {
  project: Project;
  task: Task;
}

export default function TaskListTile({project, task}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useTodos();
  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  const projectIndex = todos.items.findIndex(el => el.id === project.id);

  function rightSwipe() {
    return (
      <View
        style={[
          styles.swipeContainer,
          {
            backgroundColor: isDarkMode ? colors.darkRed : colors.lightRed,
          },
        ]}>
        <TrashIcon color={colors.white} strokeWidth={2} size={30} />
      </View>
    );
  }

  function onListTileDelete() {
    itemHeight.value = withTiming(0, {duration: 300}, () => {
      runOnJS(todos.deleteTask)(projectIndex, task.id);
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
            backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
          },
        ]}>
        <Checkbox
          value={task.completed}
          style={[
            {
              backgroundColor: isDarkMode ? '#606060' : '#f4f4f4',
            },
            styles.checkBox,
          ]}
          onChanged={() => todos.toggleTaskCompletion(projectIndex, task.id)}
        />
        <StyledText
          weight="semiBold"
          textStyles={[
            styles.text,
            {
              textDecorationLine: task.completed ? 'line-through' : 'none',
            },
          ]}>
          {task.name.length > 24 ? task.name.slice(1) + '...' : task.name}
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
  checkBox: {borderRadius: 5},
  swipeContainer: {
    height: 60,
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
