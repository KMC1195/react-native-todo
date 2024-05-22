import {Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import MyTextInput from './TextField';
import MyButton from './Button';
import {TodosContext} from '../store/todos_context';
import SnackBar from './SnackBar';

interface IScreenProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

export default function AddTaskPopup({setPopupOpen, projectId}: IScreenProps) {
  const [name, setName] = useState('');
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const todo = useContext(TodosContext);

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

      todo.createTask(projectId, newTask);

      setPopupOpen(false);
    }
  }

  return (
    <>
      <Pressable style={styles.container} onPress={() => setPopupOpen(false)}>
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
          <MyButton
            onPress={addTask}
            containerStyles={{
              alignSelf: 'flex-end',
              paddingHorizontal: 20,
            }}>
            Add
          </MyButton>
        </View>
      </Pressable>
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
});
