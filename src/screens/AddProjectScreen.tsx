import {
  ScrollView,
  SafeAreaView,
  useColorScheme,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import StyledText from '../components/StyledText';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {TodosContext} from '../store/todos_context';
import Header from '../components/Header';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function AddProjectScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Datetimepicker logic
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(Platform.OS === 'ios' ? true : false);

  function onChange(event: DateTimePickerEvent, date?: Date | undefined) {
    const currentDate = date;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDate(currentDate ? currentDate : new Date());
  }

  function showMode(currentMode: 'date' | 'time') {
    setShow(true);
    setMode(currentMode);
  }
  function showDatePicker() {
    showMode('date');
  }
  function showTimePicker() {
    showMode('time');
  }

  function formatDate(date: Date) {
    return `${
      date.getDate().toString().length > 1
        ? date.getDate()
        : `0${date.getDate()}`
    }.${
      date.getMonth().toString().length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`
    }.${date.getFullYear()} ${
      date.getHours().toString().length > 1
        ? date.getHours()
        : `0${date.getHours()}`
    }:${
      date.getMinutes().toString().length > 1
        ? date.getMinutes()
        : `0${date.getMinutes()}`
    }`;
  }

  // Adding project logic
  function addProject() {
    const newProject = {
      name,
      description,
      datetime: date,
      completed: false,
      id: Math.random(),
      tasks: [],
    };

    todos.createProject(newProject);
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <ScrollView
        style={{paddingHorizontal: 10, flex: 1}}
        showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} title="Add Project" />

        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View>
            <StyledText>Title:</StyledText>
            <MyTextInput
              placeholder="Enter a title..."
              value={name}
              setValue={setName}
            />
          </View>
          <View style={{marginTop: 20}}>
            <StyledText>Description:</StyledText>
            <MyTextInput
              placeholder="Enter a title..."
              multiline
              value={description}
              setValue={setDescription}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <MyButton onPress={showDatePicker}>Choose date</MyButton>
            <MyButton onPress={showTimePicker}>Choose time</MyButton>
          </View>

          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="spinner"
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <StyledText
            styles={{fontFamily: 'Poppins-SemiBold', alignSelf: 'center'}}>
            {`${formatDate(date)}`}
          </StyledText>

          <MyButton onPress={addProject} containerStyles={{marginTop: 30}}>
            Add
          </MyButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
