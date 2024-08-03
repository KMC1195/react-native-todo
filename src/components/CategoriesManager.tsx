import {StyleSheet, View} from 'react-native';
import React from 'react';
import StyledText from './StyledText';
import {PlusIcon} from 'react-native-heroicons/outline';
import {useColors} from '../hooks/useColors';

export default function CategoriesManager() {
  const colorPalette = useColors();

  return (
    <View style={[styles.container, {backgroundColor: colorPalette.surface}]}>
      <View style={styles.header}>
        <PlusIcon color={colorPalette.text} size={25} strokeWidth={2} />
      </View>
      <View>
        <StyledText>...</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
  },
  header: {
    alignSelf: 'flex-end',
  },
});
