import {View, StyleSheet, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../theme/colors';
import {
  Gesture,
  GestureDetector,
  Swipeable,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Project} from '../types/Todos';
import {TrashIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import {TodosContext} from '../store/todos_context';
import {NavigationProp} from '@react-navigation/native';
import Checkbox from './Checkbox';

interface Props {
  navigation: NavigationProp<any, any>;
  project: Project;
}

export default function ProjectListTile({navigation, project}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  const itemHeight = useSharedValue(60);
  const itemMarginBottom = useSharedValue(10);

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(navigation.navigate)({
      name: 'ProjectsDetailsScreen',
      params: {projectId: project.id},
    });
  });

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
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            styles.container,
            containerAnimatedStyles,
            {
              backgroundColor: isDarkMode
                ? colors.middleGray
                : colors.lightGray,
            },
          ]}>
          <Checkbox
            value={project.completed}
            style={[
              styles.checkBox,
              {
                backgroundColor: isDarkMode ? '#606060' : '#f4f4f4',
              },
            ]}
            onChanged={() => todos.toggleProjectCompletion(project.id)}
          />
          <StyledText
            weight="semiBold"
            textStyles={[
              styles.text,
              {
                textDecorationLine: project.completed ? 'line-through' : 'none',
              },
            ]}>
            {project.name.length > 24
              ? project.name.slice(1) + '...'
              : project.name}
          </StyledText>
        </Animated.View>
      </GestureDetector>
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
  checkBox: {
    borderRadius: 5,
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
