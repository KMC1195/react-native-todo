import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Project} from '../types/Todos';

type useAsyncStorageReturn = [Project[], (data: Project[]) => void];

const getData = async () => {
  try {
    const storageItems = await AsyncStorage.getItem(STORAGE_KEY);
    const defaultValue: Project[] = [];
    if (storageItems === null) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultValue));
      return defaultValue;
    }
    const JSONItems = JSON.parse(storageItems ? storageItems : '');
    JSONItems.map((el: Project) => (el.datetime = new Date(el.datetime)));
    return JSONItems;
  } catch (e) {
    console.log(e);
  }
};

const STORAGE_KEY = 'items';

export function useAsyncStorage(): useAsyncStorageReturn {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      setItems(await getData());
    })();
  }, []);

  function setNewItems(data: Project[]) {
    setItems(data);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return [items, setNewItems];
}
