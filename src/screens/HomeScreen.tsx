import {View, SafeAreaView, useColorScheme, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import MyTextInput from '../components/MyTextInput';
import ListTile from '../components/ListTile';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <ScrollView
        style={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <StyledText styles={{fontSize: 70}}>ToDo</StyledText>

        <MyTextInput></MyTextInput>

        <View style={{marginTop: 30}}>
          {todos.items.map(item => (
            <ListTile key={item.id} project={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
