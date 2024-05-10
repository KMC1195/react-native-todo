import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {Swipeable} from 'react-native-gesture-handler';

export default function ListTile() {
  function rightSwipe() {
    return (
      <View
        style={{
          backgroundColor: colors.lightRed,
          height: 60,
          flex: 1,
          borderRadius: 10,
        }}></View>
    );
  }

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View
        style={{
          backgroundColor: colors.lightGray,
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
          height: 60,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: colors.darkGray, fontWeight: '600'}}>
          Walk the dog
        </Text>
      </View>
    </Swipeable>
  );
}
