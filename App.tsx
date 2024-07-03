import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodosContextProvder from './src/store/todos_context';
import Navigation from './src/navigation/Navigation';
import ThemeContextProvder from './src/store/theme_context';

export default function App() {
  return (
    <GestureHandlerRootView>
      <ThemeContextProvder>
        <TodosContextProvder>
          <Navigation />
        </TodosContextProvder>
      </ThemeContextProvder>
    </GestureHandlerRootView>
  );
}
