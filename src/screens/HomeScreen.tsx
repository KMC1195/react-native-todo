import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import MyTextInput from '../components/TextField';
import ListTile from '../components/ProjectListTile';
import StyledText from '../components/StyledText';
import FloatingActionButton from '../components/FloatingActionButton';
import AppSafeAreaView from '../components/AppSafeAreaView';
import {useTodos} from '../hooks/useTodos';

interface IScreenProps {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: IScreenProps) {
  const [search, setSearch] = useState('');
  const todos = useTodos();

  return (
    <AppSafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <StyledText textStyles={styles.title}>ToDo</StyledText>

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
  title: {fontSize: 70},
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
