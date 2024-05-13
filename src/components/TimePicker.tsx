import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import MyTextInput from './MyTextInput';
import {TextInput} from 'react-native-gesture-handler';
import MyButton from './MyButton';

export default function TimePicker() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '85%',
          height: '35%',
          borderRadius: 10,
          backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <StyledText>Select time</StyledText>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                padding: 5,
                width: 114,
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="12"
                style={{
                  fontSize: 80,
                }}
              />
            </View>
            <StyledText styles={{fontSize: 80}}>:</StyledText>
            <View
              style={{
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                padding: 5,
                width: 114,
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="12"
                style={{
                  fontSize: 80,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <MyButton onPress={() => {}}>Cancel</MyButton>
          <MyButton onPress={() => {}}>Select</MyButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
