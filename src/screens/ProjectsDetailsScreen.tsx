import {StyleSheet, ScrollView, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import Header from '../components/Header';
import StyledText from '../components/StyledText';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import TaskListTile from '../components/TaskListTile';
import AddTaskPopup from '../components/AddTaskPopup';
import {PencilSquareIcon} from 'react-native-heroicons/outline';
import {formatDate} from '../utils/formatDate';
import AppSafeAreaView from '../components/AppSafeAreaView';
import {useTodos} from '../hooks/useTodos';
import {useTheme} from '../hooks/useTheme';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

export default function ProjectsDetailsScreen({route, navigation}: Props) {
  const [addTaskPopupVisible, setAddTaskPopupVisible] = useState(false);

  const {items, toggleProjectCompletion, deleteProject} = useTodos();
  const colorPalette = useTheme();

  const projectId = route.params?.projectId;
  const project = projectId ? items.find(el => el.id === projectId) : null;

  return (
    <>
      <AppSafeAreaView>
        {project ? (
          <>
            <Header
              navigation={navigation}
              title={project.name}
              trailing={
                <Pressable
                  onPress={() => {
                    navigation.navigate({
                      name: 'ProjectEditorScreen',
                      params: {
                        projectId: project.id,
                      },
                    });
                  }}>
                  <PencilSquareIcon color={colorPalette.text} strokeWidth={2} />
                </Pressable>
              }
            />
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {project.description && (
                <StyledText>{project.description}</StyledText>
              )}

              <StyledText textStyles={styles.dateText} weight="semiBold">
                Date: {`${formatDate(project.datetime)}`}
              </StyledText>

              <View style={styles.completedCheckBoxContainer}>
                <StyledText weight="semiBold">Completed</StyledText>
                <Checkbox
                  value={project.completed}
                  onChanged={() => toggleProjectCompletion(project.id)}
                />
              </View>

              <Button
                containerStyles={styles.deleteButton}
                danger
                onPress={() => {
                  deleteProject(project.id);
                  navigation.goBack();
                }}>
                Delete project
              </Button>

              <View style={styles.showingTasksElementContainer}>
                <View style={styles.tasksContainer}>
                  <StyledText textStyles={styles.tasksText} weight="semiBold">
                    Tasks:
                  </StyledText>
                  <Button
                    onPress={() => setAddTaskPopupVisible(true)}
                    containerStyles={styles.addTaskButton}>
                    Add task
                  </Button>
                </View>

                {project.tasks.length > 0 ? (
                  project.tasks.map(item => (
                    <TaskListTile task={item} key={item.id} project={project} />
                  ))
                ) : (
                  <StyledText>
                    There are no tasks yet. Click "Add task" to create one!
                  </StyledText>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={styles.errorBoxContainer}>
            <View
              style={[styles.errorBox, {backgroundColor: colorPalette.danger}]}>
              <StyledText textStyles={{color: colors.white}}>
                Something went wrong.
              </StyledText>
            </View>
          </View>
        )}
      </AppSafeAreaView>

      {addTaskPopupVisible && project && (
        <AddTaskPopup
          setPopupOpen={setAddTaskPopupVisible}
          projectId={project.id}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  dateText: {
    marginTop: 15,
  },
  completedCheckBoxContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 20,
  },
  showingTasksElementContainer: {
    marginTop: 30,
  },
  tasksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tasksText: {fontSize: 30},
  addTaskButton: {
    padding: 5,
  },
  errorBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBox: {
    width: '85%',
    height: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
