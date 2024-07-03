import {View, StyleSheet} from 'react-native';
import React from 'react';
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
import {NavigationProp} from '@react-navigation/native';
import Checkbox from './Checkbox';
import {useTodos} from '../hooks/useTodos';
import {useColors} from '../hooks/useColors';

interface Props {
  navigation: NavigationProp<any, any>;
  project: Project;
}

export default function ProjectListTile({navigation, project}: Props) {
  const colorPalette = useColors();
  const {deleteProject, toggleProjectCompletion} = useTodos();

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
            backgroundColor: colorPalette.accent,
          },
        ]}>
        <TrashIcon color={colors.white} strokeWidth={2} size={30} />
      </View>
    );
  }

  function onListTileDelete() {
    itemHeight.value = withTiming(0, {duration: 300}, () => {
      runOnJS(deleteProject)(project.id);
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
              backgroundColor: colorPalette.surface,
            },
          ]}>
          <Checkbox
            value={project.completed}
            onChanged={() => toggleProjectCompletion(project.id)}
          />
          <StyledText
            weight="semiBold"
            textStyles={[
              styles.text,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                textDecorationLine: project.completed ? 'line-through' : 'none',
              },
            ]}>
            {project.name}
          </StyledText>
        </Animated.View>
      </GestureDetector>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 15,
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
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
