import {View, Platform, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

export default function MyTextInput() {
  return (
    <View
      style={{
        backgroundColor: colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 0 : 15,
        borderRadius: 10,
      }}>
      <TextInput
        placeholder="Search..."
        style={{color: colors.darkGray, fontSize: 18}}
        placeholderTextColor={colors.darkGray}
      />
    </View>
  );
}
