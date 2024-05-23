import {View, useColorScheme, ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import MyTextInput from '../components/TextField';
import ListTile from '../components/ProjectListTile';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';
import FloatingActionButton from '../components/FloatingActionButton';
import AppSafeAreaView from '../components/AppSafeAreaView';

interface IScreenProps {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: IScreenProps) {
  const [search, setSearch] = useState('');

  const todos = useContext(TodosContext);

  return (
    <AppSafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <StyledText textStyles={{fontSize: 70}}>ToDo</StyledText>

        <MyTextInput
          placeholder="Search..."
          value={search}
          setValue={setSearch}
        />

        <View style={styles.projectsListContainer}>
          {todos.items
            .filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
            .map(item => (
              <ListTile key={item.id} project={item} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
      <FloatingActionButton navigation={navigation} />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  projectsListContainer: {
    marginTop: 30,
  },
});
