import {
  ScrollView,
  SafeAreaView,
  useColorScheme,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import StyledText from '../components/StyledText';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function AddProjectScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

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

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <ScrollView
        style={{paddingHorizontal: 10, flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            padding: 5,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon
              color={isDarkMode ? 'white' : colors.darkGray}
              strokeWidth={2.5}
              size={25}
            />
          </Pressable>
          <StyledText styles={{fontSize: 30}}>Add Project</StyledText>
        </View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View>
            <StyledText>Title:</StyledText>
            <MyTextInput placeholder="Enter a title..." />
          </View>
          <View style={{marginTop: 20}}>
            <StyledText>Description:</StyledText>
            <MyTextInput placeholder="Enter a title..." multiline />
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

          <StyledText>{`${date}`}</StyledText>

          <View style={{marginTop: 60}}>
            <MyButton onPress={() => {}}>Add</MyButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
