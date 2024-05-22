import {View, StyleSheet, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../theme/colors';
import {Gesture, Swipeable} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IProjectProps, ITaskProps} from '../types/Todos';
import {TrashIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import {TodosContext} from '../store/todos_context';
import Checkbox from './Checkbox';

interface Props {
  project: IProjectProps;
  task: ITaskProps;
}

export default function TaskListTile({project, task}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);
  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  const projectIndex = todos.items.findIndex(el => el.id === project.id);

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
          style={{
            backgroundColor: isDarkMode ? '#606060' : '#f4f4f4',
            borderRadius: 5,
          }}
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
});
