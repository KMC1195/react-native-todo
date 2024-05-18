import {Pressable, StyleSheet, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import MyTextInput from './MyTextInput';
import MyButton from './MyButton';

interface Props {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTaskPopup({setPopupOpen}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const [name, setName] = useState('');

  return (
    <Pressable style={styles.container} onPress={() => setPopupOpen(false)}>
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: isDarkMode ? colors.darkGray : 'white',
          },
        ]}>
        <StyledText styles={{fontSize: 30}}>Add task</StyledText>
        <MyTextInput
          value={name}
          setValue={setName}
          placeholder="Enter task's name"
        />
        <MyButton
          onPress={() => {}}
          containerStyles={{alignSelf: 'flex-end', paddingHorizontal: 20}}>
          Add
        </MyButton>
      </View>
    </Pressable>
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
  },
});
