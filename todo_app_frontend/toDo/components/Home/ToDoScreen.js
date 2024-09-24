import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import initialTodoItems from './todoSampleData'; // Rename the imported todoItems

export default function ToDoScreen() {
  const [todoItems, setTodoItems] = useState(initialTodoItems); // Use initialTodoItems to set the state
  
  // Remove a to-do item
  const removeToDoItem = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  // Render the delete action
  const renderRightActions = (itemId) => (
    <View style={styles.deleteContainer}>
      <Text
        style={styles.deleteText}
        onPress={() => {
          Alert.alert(
            'Delete To-Do',
            'Are you sure you want to delete this item?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                onPress: () => removeToDoItem(itemId),
                style: 'destructive',
              },
            ],
          );
        }}
      >
        Delete
      </Text>
    </View>
  );

  // Render a single to-do item with swipeable delete action
  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.taskTitle}</Text>
        <Text style={styles.details}>{item.details}</Text>
        <Text style={styles.completed}>
          {item.completed ? 'Completed' : 'Not Completed'}
        </Text>
        <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#81E8F9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
  completed: {
    fontSize: 14,
    marginTop: 10,
    color: 'green',
  },
  deadline: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
  },
  deleteContainer: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 10,
    marginVertical: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

