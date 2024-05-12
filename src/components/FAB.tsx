import {StyleSheet, Pressable, useColorScheme} from 'react-native';
import React from 'react';
import {PlusIcon} from 'react-native-heroicons/outline';
import {colors} from '../theme/colors';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function FAB({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      onPress={() => navigation.navigate('AddProjectScreen')}
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray},
      ]}>
      <PlusIcon
        size={30}
        color={isDarkMode ? 'white' : colors.darkGray}
        strokeWidth={2.5}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
