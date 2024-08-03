import {Pressable, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import StyledText from './StyledText';

import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useColors} from '../hooks/useColors';

interface Props {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  title: string;
  content: ReactNode;
  actions: ReactNode;
  snackBarMessage?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ANIMATION_DURATION = 200;

export default function AddTaskPopup({
  setPopupOpen,
  title,
  content,
  actions,
}: Props) {
  const colorPalette = useColors();

  return (
    <>
      <AnimatedPressable
        onPress={() => setPopupOpen(false)}
        style={styles.container}
        entering={FadeIn.duration(ANIMATION_DURATION)}
        exiting={FadeOut.duration(ANIMATION_DURATION)}>
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: colorPalette.backround,
            },
          ]}>
          <StyledText textStyles={styles.title}>{title}</StyledText>
          {/* <MyTextInput
            value={name}
            setValue={setName}
            placeholder="Enter task's name"
          /> */}
          {content}
          {/* <MyButton onPress={addTask} containerStyles={styles.addButton}>
            Add
          </MyButton> */}
          {actions}
        </View>
      </AnimatedPressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '85%',
    minHeight: '30%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {fontSize: 30},
  addButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
});
