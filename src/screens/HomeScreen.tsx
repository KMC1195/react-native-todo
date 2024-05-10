import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import MyTextInput from '../components/MyTextInput';
import ListTile from '../components/ListTile';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: Props) {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView
        style={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={{fontSize: 70, color: colors.darkGray}}>ToDo</Text>

        <MyTextInput></MyTextInput>

        <View style={{marginTop: 30}}>
          <ListTile />
          <ListTile />
          <ListTile />
          <ListTile />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
