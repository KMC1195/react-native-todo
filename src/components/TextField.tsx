import {View, Platform, TextInput, StyleSheet} from 'react-native';
import React, {Dispatch} from 'react';
import {useTheme} from '../hooks/useTheme';

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
  const colorPalette = useTheme();

  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          minHeight: multiline ? 100 : 50,
          maxHeight: multiline ? 350 : 50,
          backgroundColor: colorPalette.surface,
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
            color: colorPalette.text,
          },
        ]}
        placeholderTextColor={colorPalette.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 15,
    borderRadius: 15,
  },
  input: {
    fontSize: 18,
  },
});
