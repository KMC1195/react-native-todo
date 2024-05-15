import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any>;
}

export default function ProjectsDetailsScreen({route}: Props) {
  const projectId = route.params?.projectId;

  return (
    <View>
      <Text style={{fontSize: 60, color: 'red'}}>{projectId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
