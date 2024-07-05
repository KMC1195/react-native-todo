import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {NavigationProp} from '@react-navigation/native';
import AppSafeAreaView from '../components/AppSafeAreaView';
import StyledText from '../components/StyledText';
import Select from '../components/Select';
import useTheme from '../hooks/useTheme';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function OptionsScreen({navigation}: Props) {
  const {theme, setAppTheme} = useTheme();

  const appThemes = ['light', 'dark', 'synced to your device'];

  return (
    <AppSafeAreaView>
      <Header navigation={navigation} leading="showDrawer">
        <StyledText weight="semiBold">Options</StyledText>
      </Header>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.control}>
          <StyledText>App theme:</StyledText>
          <Select
            options={appThemes}
            selectedOption={theme}
            setSelectedOption={setAppTheme}
          />
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  control: {
    flexDirection: 'column',
    gap: 6,
  },
});
