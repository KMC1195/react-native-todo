import {View, Pressable, useColorScheme} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';

interface Props {
  navigation: NavigationProp<any, any>;
  title: string;
}

export default function Header({navigation, title}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        padding: 5,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeftIcon
          color={isDarkMode ? 'white' : colors.darkGray}
          strokeWidth={2.5}
          size={25}
        />
      </Pressable>
      <StyledText styles={{fontSize: 30}}>{title}</StyledText>
    </View>
  );
}
