import {SafeAreaView} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '../hooks/useTheme';

interface Props {
  children: ReactNode;
}

export default function AppSafeAreaView({children}: Props) {
  const colorPalette = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorPalette.backround}}>
      {children}
    </SafeAreaView>
  );
}
