import {SafeAreaView, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {useColors} from '../hooks/useColors';

interface Props {
  children: ReactNode;
}

export default function AppSafeAreaView({children}: Props) {
  const colorPalette = useColors();

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
