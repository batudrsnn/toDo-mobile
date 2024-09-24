import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddToDoScreen({ route, navigation }) {
  const { addNewItem } = route.params; // Get the addNewItem function from params
  const [taskTitle, setTaskTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddItem = () => {
    if (taskTitle && details) {
      const newTask = {
        id: Math.random().toString(), // Unique ID for the new task
        taskTitle,
        details,
        completed: false,
        deadline,
      };
      addNewItem(newTask); // Call the addNewItem function
      navigation.goBack(); // Navigate back to the previous screen
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Details"
        value={details}
        onChangeText={setDetails}
        style={styles.input}
      />
      <TextInput
        placeholder="Deadline"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
