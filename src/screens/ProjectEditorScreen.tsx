import {
  ScrollView,
  StyleSheet,
  Platform,
  View,
  useColorScheme,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Header from '../components/Header';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';
import MyTextInput from '../components/TextField';
import MyButton from '../components/Button';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatDate} from '../utils/formatDate';
import {DatetimePickerMode} from '../types/DatetimePicker';
import SnackBar from '../components/SnackBar';
import AppSafeAreaView from '../components/AppSafeAreaView';

interface IScreenProps {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

export default function ProjectEditorScreen({route, navigation}: IScreenProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [datetimePickerMode, setDatetimePickerMode] =
    useState<DatetimePickerMode>('date');
  const [isDatetimePickerShown, setIsDatetimePickerShown] = useState(
    Platform.OS === 'ios' ? true : false,
  );
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  const projectId = route.params?.projectId;

  const project = todos.items.filter(el => el.id === projectId)[0];

  function onDatetimePickerValueChange(
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) {
    const currentDate = date;
    if (Platform.OS === 'android') {
      setIsDatetimePickerShown(false);
    }
    setDate(currentDate ? currentDate : new Date());
  }

  function changeDatetimePickerMode(currentMode: 'date' | 'time') {
    setIsDatetimePickerShown(true);
    setDatetimePickerMode(currentMode);
  }
  function showDatePicker() {
    changeDatetimePickerMode('date');
  }
  function showTimePicker() {
    changeDatetimePickerMode('time');
  }

  function handleButtonPress() {
    if (name) {
      if (projectId) {
        const newData = {
          name,
          description,
          datetime: date,
        };
        todos.editProject(project.id, newData);
        navigation.goBack();
      } else {
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
    } else {
      setIsSnackBarShown(true);
      setTimeout(() => {
        setIsSnackBarShown(false);
      }, 2500);
    }
  }

  useEffect(() => {
    if (projectId) {
      setName(project.name);
      setDescription(project.description);
      setDate(new Date(project.datetime));
    }
  }, []);

  return (
    <>
      <AppSafeAreaView>
        <Header
          title={projectId ? 'Edit project' : 'Add project'}
          navigation={navigation}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 10}}>
            <View>
              <StyledText>Title</StyledText>
              <MyTextInput value={name} setValue={setName} />
            </View>
            <View style={styles.descriptionInputContainer}>
              <StyledText>Description</StyledText>
              <MyTextInput
                multiline={true}
                value={description}
                setValue={setDescription}
              />
            </View>
            <View style={styles.datetimeButtonsContainer}>
              <MyButton onPress={showDatePicker}>Edit date</MyButton>
              <MyButton onPress={showTimePicker}>Edit time</MyButton>
            </View>

            {isDatetimePickerShown && (
              <DateTimePicker
                value={date}
                mode={datetimePickerMode}
                display="spinner"
                is24Hour={true}
                onChange={onDatetimePickerValueChange}
              />
            )}

            <StyledText textStyles={styles.dateString} weight="semiBold">
              {`${formatDate(date)}`}
            </StyledText>

            <MyButton
              onPress={handleButtonPress}
              containerStyles={styles.editProjectButton}>
              {projectId ? 'Edit project' : 'Add project'}
            </MyButton>
          </View>
        </ScrollView>
      </AppSafeAreaView>
      <SnackBar
        message="You can't create or edit a project without a title"
        isShown={isSnackBarShown}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  descriptionInputContainer: {
    marginTop: 20,
  },
  datetimeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  dateString: {
    marginTop: 20,
    alignSelf: 'center',
  },
  editProjectButton: {
    marginTop: 20,
  },
});
