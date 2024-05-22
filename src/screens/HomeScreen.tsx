import {
  View,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {colors} from '../theme/colors';
import MyTextInput from '../components/TextField';
import ListTile from '../components/ProjectListTile';
import {TodosContext} from '../store/todos_context';
import StyledText from '../components/StyledText';
import FAB from '../components/FAB';

interface IScreenProps {
  navigation: NavigationProp<any, any>;
}

export default function HomeScreen({navigation}: IScreenProps) {
  const [search, setSearch] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const todos = useContext(TodosContext);

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: isDarkMode ? colors.darkGray : colors.white,
        },
        styles.safeAreaView,
      ]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <StyledText textStyles={{fontSize: 70}}>ToDo</StyledText>

        <MyTextInput
          placeholder="Search..."
          value={search}
          setValue={setSearch}
        />

        <View style={styles.projectsListContainer}>
          {todos.items
            .filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
            .map(item => (
              <ListTile key={item.id} project={item} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
      <FAB navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
