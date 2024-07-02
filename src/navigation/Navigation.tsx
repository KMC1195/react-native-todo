import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProjectsDetailsScreen from '../screens/ProjectsDetailsScreen';
import ProjectEditorScreen from '../screens/ProjectEditorScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
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
  );
}
