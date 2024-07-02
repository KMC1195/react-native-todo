import {SafeAreaView, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '../hooks/useTheme';

interface Props {
  children: ReactNode;
}

export default function AppSafeAreaView({children}: Props) {
  const colorPalette = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colorPalette.backround}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
