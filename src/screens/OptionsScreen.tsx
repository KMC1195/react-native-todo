import React from 'react';
import Header from '../components/Header';
import {NavigationProp} from '@react-navigation/native';
import AppSafeAreaView from '../components/AppSafeAreaView';
import StyledText from '../components/StyledText';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function OptionsScreen({navigation}: Props) {
  return (
    <AppSafeAreaView>
      <Header navigation={navigation} leading="showDrawer">
        <StyledText weight="semiBold">Options</StyledText>
      </Header>
    </AppSafeAreaView>
  );
}
