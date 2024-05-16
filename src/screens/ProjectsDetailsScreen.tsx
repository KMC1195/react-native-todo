import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TodosContext} from '../store/todos_context';
import {colors} from '../theme/colors';
import Header from '../components/Header';
import StyledText from '../components/StyledText';
import MyButton from '../components/MyButton';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

export default function ProjectsDetailsScreen({route, navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const projectId = route.params?.projectId;

  const todos = useContext(TodosContext);
  const project = todos.items.filter(el => el.id == projectId)[0];

  function formatDate(date: Date) {
    return `${
      date.getDate().toString().length > 1
        ? date.getDate()
        : `0${date.getDate()}`
    }.${
      date.getMonth().toString().length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`
    }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? colors.darkGray : 'white',
        flex: 1,
      }}>
      <Header navigation={navigation} title={project.name} />

      <ScrollView style={{paddingHorizontal: 10}}>
        <StyledText>{project.description}</StyledText>
        <StyledText>{`${formatDate(project.datetime)}`}</StyledText>
        <MyButton
          containerStyles={{
            marginTop: 20,
            backgroundColor: isDarkMode ? colors.darkRed : colors.lightRed,
          }}
          textStyles={{color: 'white'}}
          onPress={() => {
            todos.deleteProject(project.id);
            navigation.goBack();
          }}>
          Delete project
        </MyButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
