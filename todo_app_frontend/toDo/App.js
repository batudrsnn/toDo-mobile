import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import AppEntranceScreen from './components/Login/AppEntranceScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AppEntranceScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});
