import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodosContextProvder from './src/store/todos_context';
import ProjectsDetailsScreen from './src/screens/ProjectsDetailsScreen';
import EditProjectScreen from './src/screens/ProjectEditorScreen';
import ProjectEditorScreen from './src/screens/ProjectEditorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <TodosContextProvder>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="ProjectsDetailsScreen"
              component={ProjectsDetailsScreen}
            />
            <Stack.Screen
              name="ProjectEditorScreen"
              component={ProjectEditorScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodosContextProvder>
    </GestureHandlerRootView>
  );
}
