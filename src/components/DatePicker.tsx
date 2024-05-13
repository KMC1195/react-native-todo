import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import MyTextInput from './MyTextInput';
import {TextInput} from 'react-native-gesture-handler';
import MyButton from './MyButton';

export default function DatePicker() {
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
        <StyledText>Select date</StyledText>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                padding: 5,
                width: 90,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="13"
                style={{
                  fontSize: 60,
                }}
              />
            </View>
            <StyledText styles={{fontSize: 60}}>.</StyledText>
            <View
              style={{
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                padding: 5,
                width: 90,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="05"
                style={{
                  fontSize: 60,
                }}
              />
            </View>
            <StyledText styles={{fontSize: 60}}>.</StyledText>
            <View
              style={{
                // backgroundColor: 'red',
                borderWidth: 3,
                borderRadius: 10,
                padding: 5,
                width: 90,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="24"
                style={{
                  fontSize: 60,
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
