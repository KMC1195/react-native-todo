import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodosContextProvder from './src/store/todos_context';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <GestureHandlerRootView>
      <TodosContextProvder>
        <Navigation />
      </TodosContextProvder>
    </GestureHandlerRootView>
  );
}
