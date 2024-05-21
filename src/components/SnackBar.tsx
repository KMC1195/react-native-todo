import {View, Text, useColorScheme} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';

interface Props {
  isShown: boolean;
  message: string;
}

export default function SnackBar({isShown, message}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      {isShown && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            width: '95%',
            height: 60,
            backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <StyledText styles={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>
            {message}
          </StyledText>
        </Animated.View>
      )}
    </>
  );
}
