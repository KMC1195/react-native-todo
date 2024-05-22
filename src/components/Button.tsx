import {
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import {GestureResponderEvent} from 'react-native';

interface Props {
  children: ReactNode;
  containerStyles?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Button({
  children,
  onPress,
  textStyles,
  containerStyles,
}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.middleGray : colors.lightGray},
        containerStyles,
      ]}>
      <StyledText textStyles={[textStyles ? textStyles : {}]} weight="semiBold">
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