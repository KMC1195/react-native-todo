import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Project} from '../types/Todos';
import {applicationTheme} from '../types/Theme';

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
    const stringData = await AsyncStorage.getItem(STORAGE_KEY);

    if (stringData === null) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultValue));
      return JSON.stringify(defaultValue);
    }
    const data = JSON.parse(stringData);

    data.forEach((el: Project) => (el.datetime = new Date(el.datetime)));

    return data;
  } catch (err) {
    console.log(err);
  }
};

type Items = applicationTheme | Project[];

export function useAsyncStorage<Value extends Items>(
  STORAGE_KEY: string,
  defaultValue: Value,
) {
  const [items, setItems] = useState(defaultValue);

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      (async () => {
        const data = await getStringData(STORAGE_KEY, defaultValue);
        setItems(data ? (data as Value) : ('light' as Value));
      })();
    } else if (typeof defaultValue === 'object') {
      (async () => {
        const data = await getObjectData(
          STORAGE_KEY,
          defaultValue ? defaultValue : {},
        );
        setItems(data);
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
