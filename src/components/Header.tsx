import {View, Pressable, StyleSheet} from 'react-native';
import {ArrowLeftIcon, Bars3Icon} from 'react-native-heroicons/outline';
import React, {ReactNode} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import {DrawerActions} from '@react-navigation/native';

interface Props {
  children: ReactNode;
  navigation: NavigationProp<any, any>;
  trailing?: ReactNode;
  leading?: 'goBack' | 'showDrawer';
}

export default function Header({
  children,
  navigation,
  trailing,
  leading = 'goBack',
}: Props) {
  const colorPalette = useTheme();

  return (
    <View style={styles.mainContainer}>
      {leading === 'goBack' ? (
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeftIcon
            color={colorPalette.text}
            strokeWidth={2.5}
            size={25}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Bars3Icon color={colorPalette.text} strokeWidth={2.5} size={25} />
        </Pressable>
      )}
      {children}
      {trailing || <View />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});
