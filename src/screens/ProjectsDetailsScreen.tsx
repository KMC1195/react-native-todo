import {StyleSheet, SafeAreaView, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TodosContext} from '../store/todos_context';
import {colors} from '../theme/colors';
import Header from '../components/Header';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

export default function ProjectsDetailsScreen({route, navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const projectId = route.params?.projectId;

  const todos = useContext(TodosContext);
  const project = todos.items.filter(el => el.id == projectId)[0];

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <Header navigation={navigation} title={project.name} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
