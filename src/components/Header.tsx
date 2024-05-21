import {View, Pressable, useColorScheme} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import React, {ReactNode} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';

interface Props {
  navigation: NavigationProp<any, any>;
  title: string;
  trailing?: ReactNode;
}

export default function Header({navigation, title, trailing}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeftIcon
            color={isDarkMode ? 'white' : colors.darkGray}
            strokeWidth={2.5}
            size={25}
          />
        </Pressable>
        <StyledText
          styles={{
            fontSize: 30,
            width: '80%',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}>
          {title.length > 15 ? title.slice(title.length - 15) + '...' : title}
        </StyledText>
      </View>
      {trailing ? trailing : ''}
    </View>
  );
}
