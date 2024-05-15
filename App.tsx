import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import AddProjectScreen from './src/screens/AddProjectScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodosContextProvder from './src/store/todos_context';
import ProjectsDetailsScreen from './src/screens/ProjectsDetailsScreen';

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
              name="AddProjectScreen"
              component={AddProjectScreen}
            />
            <Stack.Screen
              name="ProjectsDetailsScreen"
              component={ProjectsDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodosContextProvder>
    </GestureHandlerRootView>
  );
}
