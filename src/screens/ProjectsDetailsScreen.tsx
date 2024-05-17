import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TodosContext} from '../store/todos_context';
import {colors} from '../theme/colors';
import Header from '../components/Header';
import StyledText from '../components/StyledText';
import MyButton from '../components/MyButton';
import Checkbox from '../components/Checkbox';
import ListTile from '../components/ProjectListTile';
import TaskListTile from '../components/TaskListTile';

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

      <ScrollView
        style={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <StyledText>{project.description}</StyledText>

        <StyledText
          styles={{
            marginTop: 15,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Date: {`${formatDate(project.datetime)}`}
        </StyledText>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <StyledText styles={{fontFamily: 'Poppins-SemiBold'}}>
            Completed
          </StyledText>
          <Checkbox
            value={project.completed}
            onChanged={() => todos.toggleProjectCompletion(project.id)}
          />
        </View>

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

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <StyledText styles={{fontFamily: 'Poppins-SemiBold', fontSize: 30}}>
              Tasks:
            </StyledText>
            <MyButton onPress={() => {}} containerStyles={{padding: 5}}>
              Add task
            </MyButton>
          </View>

          {project.tasks.map((item, index) => (
            <TaskListTile task={item} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
