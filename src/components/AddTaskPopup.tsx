import {Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import MyTextInput from './TextField';
import MyButton from './Button';
import SnackBar from './SnackBar';
import {useTodos} from '../hooks/useTodos';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

interface IScreenProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AddTaskPopup({setPopupOpen, projectId}: IScreenProps) {
  const [name, setName] = useState('');
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const todos = useTodos();

  function addTask() {
    if (!name) {
      setIsSnackBarShown(true);
      setTimeout(() => {
        setIsSnackBarShown(false);
      }, 2500);
    } else {
      const newTask = {
        name,
        id: Math.random(),
        completed: false,
      };

      todos.createTask(projectId, newTask);

      setPopupOpen(false);
    }
  }

  return (
    <>
      <AnimatedPressable
        onPress={() => setPopupOpen(false)}
        style={styles.container}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}>
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: isDarkMode ? colors.darkGray : colors.white,
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
