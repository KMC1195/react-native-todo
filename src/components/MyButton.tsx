import {Pressable, StyleSheet, Text, useColorScheme} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import {GestureResponderEvent} from 'react-native';

interface Props {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

export default function MyButton({children, onPress}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray},
      ]}>
      <StyledText styles={{fontFamily: 'Poppins-SemiBold'}}>
        {children}
      </StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
