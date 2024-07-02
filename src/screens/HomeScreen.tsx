import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import MyTextInput from '../components/TextField';
import ListTile from '../components/ProjectListTile';
import FloatingActionButton from '../components/FloatingActionButton';
import AppSafeAreaView from '../components/AppSafeAreaView';
import {useTodos} from '../hooks/useTodos';
import Header from '../components/Header';
import StyledText from '../components/StyledText';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: Props) {
  const [search, setSearch] = useState('');
  const {items} = useTodos();

  return (
    <AppSafeAreaView>
      <Header navigation={navigation} leading="showDrawer">
        <StyledText weight="semiBold">Home</StyledText>
      </Header>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <MyTextInput
          placeholder="Search..."
          value={search}
          setValue={setSearch}
        />

        <View style={styles.projectsListContainer}>
          {items
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
