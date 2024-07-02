import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Separator from './Separator';
import StyledText from './StyledText';
import {colors} from '../theme/colors';

export default function CustomDrawer({...props}) {
  const colorPalette = useTheme();

  const {routeNames} = props.state;

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: colorPalette.accent,
        },
      ]}>
      <StyledText textStyles={styles.title}>ToDo</StyledText>
      <Separator style={{backgroundColor: colors.white}} />
      {routeNames.map((item: string, index: number) => (
        <Pressable
          style={styles.button}
          key={index}
          onPress={() => props.navigation.navigate(item)}>
          <StyledText weight="semiBold" textStyles={{color: colors.darkGray}}>
            {item}
          </StyledText>
        </Pressable>
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.white,
    fontSize: 70,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 15,
  },
});
