import {ScrollView, StyleSheet, Platform, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Header from '../components/Header';
import StyledText from '../components/StyledText';
import MyTextInput from '../components/TextField';
import MyButton from '../components/Button';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatDate} from '../utils/formatDate';
import SnackBar from '../components/SnackBar';
import AppSafeAreaView from '../components/AppSafeAreaView';
import {useTodos} from '../hooks/useTodos';
import {colors} from '../theme/colors';
import useTheme from '../hooks/useTheme';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

type DatetimePickerMode = 'date' | 'time';

export default function ProjectEditorScreen({route, navigation}: Props) {
  const projectId = route.params?.projectId;
  const {items, editProject, createProject} = useTodos();
  const project = items.find(el => el.id === projectId);

  const [name, setName] = useState(project?.name ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [date, setDate] = useState(project?.datetime ?? new Date());
  const [datetimePickerMode, setDatetimePickerMode] =
    useState<DatetimePickerMode>('date');
  const [isDatetimePickerShown, setIsDatetimePickerShown] = useState(
    Platform.OS === 'ios' ? true : false,
  );
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);

  const {theme} = useTheme();

  function onDatetimePickerValueChange(
    event: DateTimePickerEvent,
    newDate?: Date,
  ) {
    if (Platform.OS === 'android') {
      setIsDatetimePickerShown(false);
    }
    setDate(newDate ?? new Date());
  }

  function changeDatetimePickerMode(currentMode: DatetimePickerMode) {
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
    if (!name) {
      setIsSnackBarShown(true);
      setTimeout(() => {
        setIsSnackBarShown(false);
      }, 2500);

      return;
    }
    if (!projectId) {
      const newProject = {
        name,
        description,
        datetime: date,
        completed: false,
        id: Math.random(),
        tasks: [],
      };
      createProject(newProject);
      navigation.goBack();

      return;
    }
    const newData = {
      name,
      description,
      datetime: date,
    };
    editProject(project?.id, newData);
    navigation.goBack();
  }

  return (
    <>
      <AppSafeAreaView>
        <Header navigation={navigation}>
          <StyledText weight="semiBold">
            {projectId ? 'Edit project' : 'Add project'}
          </StyledText>
        </Header>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.titleInputContainer}>
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
                textColor={theme === 'dark' ? colors.white : colors.darkGray}
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
              accent
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
  titleInputContainer: {
    marginBottom: 10,
  },
});
