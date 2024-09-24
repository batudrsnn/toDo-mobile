import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
