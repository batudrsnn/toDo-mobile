import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text} from 'react-native';

export default function MyTeamsScreen() {
  return(
    <View>
      <Text>Team1</Text>
      <Text>Team2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
});
