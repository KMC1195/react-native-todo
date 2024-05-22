import {
  View,
  Platform,
  TextInput,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import React, {Dispatch} from 'react';
import {colors} from '../theme/colors';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

export default function TextField({
  placeholder,
  multiline = false,
  value,
  setValue,
}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          minHeight: multiline ? 100 : 50,
          maxHeight: multiline ? 350 : 50,
          backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
        },
      ]}>
      <TextInput
        placeholder={placeholder || ''}
        multiline={multiline}
        value={value}
        onChangeText={e => setValue(e)}
        style={[
          styles.input,
          {
            color: isDarkMode ? colors.white : colors.darkGray,
          },
        ]}
        placeholderTextColor={isDarkMode ? colors.white : colors.darkGray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 15,
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
  },
});
