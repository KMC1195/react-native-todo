import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Project} from '../types/Todos';

const getStringData = async (STORAGE_KEY: string, defaultValue: string) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data === null) {
      await AsyncStorage.setItem(STORAGE_KEY, defaultValue);
      return defaultValue;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

const getObjectData = async (STORAGE_KEY: string, defaultValue: object) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data === null) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultValue));
      return JSON.stringify(defaultValue);
    }

    return JSON.parse(data);
  } catch (err) {}
};

type Items = '' | Project[];

export function useAsyncStorage<Value extends Items>(
  STORAGE_KEY: string,
  defaultValue: Value,
) {
  const [items, setItems] = useState(defaultValue);

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      (async () => {
        await getStringData(STORAGE_KEY, defaultValue);
      })();
    } else if (typeof defaultValue === 'object') {
      (async () => {
        await getObjectData(STORAGE_KEY, defaultValue ? defaultValue : {});
      })();
    }
  }, [STORAGE_KEY, defaultValue]);

  function setData(value: Value) {
    setItems(value);
    AsyncStorage.setItem(
      STORAGE_KEY,
      typeof value === 'string' ? value : JSON.stringify(value),
    );
  }

  return {items, setData};
}
