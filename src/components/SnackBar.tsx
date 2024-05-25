import {useColorScheme, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import StyledText from './StyledText';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

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
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode
                ? colors.middleGray
                : colors.lightGray,
            },
          ]}>
          <StyledText textStyles={styles.text} weight="semiBold">
            {message}
          </StyledText>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '95%',
    height: 60,
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
  },
  text: {fontSize: 20},
});
