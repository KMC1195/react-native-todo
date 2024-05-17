import {View, SafeAreaView, useColorScheme, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import MyTextInput from '../components/MyTextInput';
import ListTile from '../components/ProjectListTile';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';
import FAB from '../components/FAB';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  const [search, setSearch] = useState('');

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

        <MyTextInput
          placeholder="Search..."
          value={search}
          setValue={setSearch}
        />

        <View style={{marginTop: 30}}>
          {todos.items
            .filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
            .map(item => (
              <ListTile key={item.id} project={item} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
      <FAB navigation={navigation} />
    </SafeAreaView>
  );
}
