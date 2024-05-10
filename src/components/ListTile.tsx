import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

export default function ListTile() {
  return (
    <View
      style={{
        backgroundColor: colors.lightGray,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
      }}>
      <Text style={{fontSize: 20, color: colors.darkGray, fontWeight: '600'}}>
        Walk the dog
      </Text>
    </View>
  );
}
