import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  View,
  useColorScheme,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import Header from '../components/Header';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

export default function EditProjectScreen({route, navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  const projectId = route.params?.projectId;

  const project = todos.items.filter(el => el.id === projectId)[0];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
    setDate(new Date(project.datetime));
  }, []);

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

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <Header title="Edit project" navigation={navigation} />

      <ScrollView
        style={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 10}}>
          <View>
            <StyledText>Title</StyledText>
            <MyTextInput value={name} setValue={setName} />
          </View>
          <View style={{marginTop: 20}}>
            <StyledText>Description</StyledText>
            <MyTextInput
              multiline={true}
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
            styles={{
              fontFamily: 'Poppins-SemiBold',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            {`${formatDate(date)}`}
          </StyledText>

          <MyButton
            onPress={() => {
              const newData = {
                name,
                description,
                datetime: date,
              };

              todos.editProject(project.id, newData);
              navigation.goBack();
            }}
            containerStyles={{marginTop: 20}}>
            Edit project
          </MyButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
