import React from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';

export default function ToDoScreen({ todoItems, setTodoItems }) {
  // Remove a to-do item
  const removeToDoItem = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  // Toggle completed status for an item
  const toggleComplete = (id) => {
    setTodoItems(
      todoItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
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

  // Render a single to-do item with swipeable delete action and a checkbox
  const renderItem = ({ item }) => {
    const deadlineLabel = getDeadlineLabel(item.deadline); // Get the deadline label
    
    // Change background color based on completion status
    const itemBackgroundColor = item.completed ? '#81E8F9' : '#F2BF91';

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={[styles.item, { backgroundColor: itemBackgroundColor }]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.taskTitle}</Text>
            <Text style={styles.details}>{item.details}</Text>
            <Text style={styles.deadline}>
              Deadline: {deadlineLabel}
            </Text>
          </View>
          <CheckBox
            size={34}
            checked={item.completed}
            onPress={() => toggleComplete(item.id)}
            containerStyle={styles.checkBoxContainer}
          />
        </View>
      </Swipeable>
    );
  };
  
  /* Check deadline date weather it's tomorrow or today */
  const getDeadlineLabel = (deadline) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
  
    if (deadlineDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (deadlineDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return deadline;
    }
  };

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
  deadline: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
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
