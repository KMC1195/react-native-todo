import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../theme/colors';

interface ComponentProps {
  children: ReactNode;
}

export default function AppSafeAreaView({children}: ComponentProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={isDarkMode ? styles.safeAreaViewDark : styles.safeAreaViewLight}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewLight: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeAreaViewDark: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
});
