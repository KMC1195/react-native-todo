import {View, Platform, TextInput, useColorScheme} from 'react-native';
import React, {Dispatch} from 'react';
import {colors} from '../theme/colors';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

export default function MyTextInput({
  placeholder,
  multiline = false,
  value,
  setValue,
}: Props) {
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
        value={value}
        onChangeText={e => setValue(e)}
        style={{
          color: isDarkMode ? 'white' : colors.darkGray,
          fontSize: 18,
        }}
        placeholderTextColor={isDarkMode ? 'white' : colors.darkGray}
      />
    </View>
  );
}
