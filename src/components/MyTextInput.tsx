import {View, Platform, TextInput, useColorScheme} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

interface Props {
  placeholder?: string;
  multiline?: boolean;
}

export default function MyTextInput({placeholder, multiline = false}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 0 : 15,
        borderRadius: 10,
        minHeight: multiline ? 100 : 50,
        maxHeight: multiline ? 350 : 50,
      }}>
      <TextInput
        placeholder={placeholder || ''}
        multiline={multiline}
        style={{
          color: isDarkMode ? 'white' : colors.darkGray,
          fontSize: 18,
        }}
        placeholderTextColor={isDarkMode ? 'white' : colors.darkGray}
      />
    </View>
  );
}
