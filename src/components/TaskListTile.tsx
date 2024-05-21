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
import {Project, Task} from '../models/todos_models';
import {TrashIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import {TodosContext} from '../store/todos_context';
import Checkbox from './Checkbox';

interface Props {
  project: Project;
  task: Task;
}

export default function TaskListTile({project, task}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const todos = useContext(TodosContext);

  const projectIndex = todos.items.findIndex(el => el.id === project.id);

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
          styles={{
            fontFamily: 'Poppins-SemiBold',
            textDecorationLine: task.completed ? 'line-through' : 'none',
            flex: 1,
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}>
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
});
