import {View, Pressable, StyleSheet} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import StyledText from './StyledText';
import React, {ReactNode} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';

interface Props {
  navigation: NavigationProp<any, any>;
  title: string;
  trailing?: ReactNode;
}

export default function Header({navigation, title, trailing}: Props) {
  const colorPalette = useTheme();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleAndBackButtonContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeftIcon
            color={colorPalette.text}
            strokeWidth={2.5}
            size={25}
          />
        </Pressable>
        <StyledText textStyles={styles.title}>
          {title.length > 15 ? title.slice(title.length - 15) + '...' : title}
        </StyledText>
      </View>
      {trailing ? trailing : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  titleAndBackButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 30,
    width: '80%',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
});
