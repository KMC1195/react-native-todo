import {View, Platform, TextInput, useColorScheme} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

export default function MyTextInput() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 0 : 15,
        borderRadius: 10,
      }}>
      <TextInput
        placeholder="Search..."
        style={{color: isDarkMode ? 'white' : colors.darkGray, fontSize: 18}}
        placeholderTextColor={isDarkMode ? 'white' : colors.darkGray}
      />
    </View>
  );
}
