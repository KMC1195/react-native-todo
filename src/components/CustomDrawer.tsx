import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useColors} from '../hooks/useColors';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Separator from './Separator';
import StyledText from './StyledText';
import {colors} from '../theme/colors';
import {CogIcon, HomeIcon} from 'react-native-heroicons/outline';

export default function CustomDrawer({...props}) {
  const colorPalette = useColors();

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
      <View style={styles.buttonsContainer}>
        {routeNames.map((item: string, index: number) => (
          <Pressable
            style={styles.button}
            key={index}
            onPress={() => props.navigation.navigate(item)}>
            {item === 'Home' ? (
              <HomeIcon color={colors.white} size={30} strokeWidth={2} />
            ) : (
              <CogIcon color={colors.white} strokeWidth={2} size={30} />
            )}
            <StyledText weight="semiBold" textStyles={{color: colors.white}}>
              {item}
            </StyledText>
          </Pressable>
        ))}
      </View>
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
  buttonsContainer: {
    marginTop: 12,
  },
  button: {
    marginTop: 6,
    padding: 8,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
