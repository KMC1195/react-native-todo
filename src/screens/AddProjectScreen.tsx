import {
  ScrollView,
  SafeAreaView,
  useColorScheme,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import StyledText from '../components/StyledText';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function AddProjectScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <ScrollView
        style={{paddingHorizontal: 10, flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
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
            <MyButton onPress={() => {}}>Choose date</MyButton>
            <MyButton onPress={() => {}}>Choose time</MyButton>
          </View>

          <View style={{marginTop: 60}}>
            <MyButton onPress={() => {}}>Add</MyButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
