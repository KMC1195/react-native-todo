import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function AddProjectScreen({navigation}: Props) {
  return (
    <SafeAreaView>
      <Button title="back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
