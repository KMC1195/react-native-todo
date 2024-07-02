import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {PlusIcon} from 'react-native-heroicons/outline';
import {NavigationProp} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import {colors} from '../theme/colors';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function FloatingActionButton({navigation}: Props) {
  const colorPalette = useTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('ProjectEditorScreen')}
      style={[styles.container, {backgroundColor: colorPalette.accent}]}>
      <PlusIcon size={30} color={colors.white} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
