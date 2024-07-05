import {Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useColors} from '../hooks/useColors';
import StyledText from './StyledText';
import Animated, {FadeInUp} from 'react-native-reanimated';

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: Function;
  onChoose?: () => void;
}

export default function Select({
  options,
  selectedOption,
  setSelectedOption,
  onChoose,
}: Props) {
  const [isShown, setIsShown] = useState(false);

  const colorPalette = useColors();

  function chooseOption(item: string) {
    setSelectedOption(item);
    setIsShown(false);
    if (onChoose) {
      onChoose();
    }
  }

  return (
    <>
      <Pressable
        onPress={() => setIsShown(prevState => !prevState)}
        style={[
          styles.container,
          {
            backgroundColor: colorPalette.surface,
          },
        ]}>
        <StyledText>{selectedOption}</StyledText>
      </Pressable>
      {isShown && (
        <Animated.View
          entering={FadeInUp.duration(200)}
          style={[styles.options, {backgroundColor: colorPalette.surface}]}>
          {options.map((item, index) => (
            <Pressable key={index} onPress={() => chooseOption(item)}>
              <StyledText>{item}</StyledText>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  options: {
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    elevation: 10,
  },
});
