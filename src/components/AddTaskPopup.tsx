import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import StyledText from './StyledText';
import MyTextInput from './TextField';
import MyButton from './Button';
import SnackBar from './SnackBar';
import {useTodos} from '../hooks/useTodos';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTheme} from '../hooks/useTheme';

interface Props {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ANIMATION_DURATION = 200;
const POPUP_TIME = 2500;

export default function AddTaskPopup({setPopupOpen, projectId}: Props) {
  const [name, setName] = useState('');
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);

  const colorPalette = useTheme();
  const {createTask} = useTodos();

  // function addTask() {
  //   if (!name) {
  //     setIsSnackBarShown(true);
  //     setTimeout(() => {
  //       setIsSnackBarShown(false);
  //     }, POPUP_TIME);
  //   } else {
  //     const newTask = {
  //       name,
  //       id: Math.random(),
  //       completed: false,
  //     };

  //     createTask(projectId, newTask);

  //     setPopupOpen(false);
  //   }
  // }

  function addTask() {
    if (!name) {
      setIsSnackBarShown(true);
      setTimeout(() => {
        setIsSnackBarShown(false);
      }, POPUP_TIME);

      return;
    }

    const newTask = {
      name,
      id: Math.random(),
      completed: false,
    };

    createTask(projectId, newTask);

    setPopupOpen(false);
  }

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
          <StyledText textStyles={styles.title}>Add task</StyledText>
          <MyTextInput
            value={name}
            setValue={setName}
            placeholder="Enter task's name"
          />
          <MyButton onPress={addTask} containerStyles={styles.addButton}>
            Add
          </MyButton>
        </View>
      </AnimatedPressable>

      <SnackBar
        message="You can't create a task without a title!"
        isShown={isSnackBarShown}
      />
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
