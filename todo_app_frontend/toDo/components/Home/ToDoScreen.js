import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert, Modal, TextInput, Button, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import DatePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';

export default function ToDoScreen({ todoItems, setTodoItems }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Open the modal to edit a to-do item
  const openEditModal = (item) => {
    setEditableItem(item);
    setSelectedDate(new Date(item.deadline)); // Set the selected date to the item's deadline
    setModalVisible(true);
  };

  // Save changes to the to-do item
  const saveChanges = () => {
    if (editableItem) {
      setTodoItems(todoItems.map(item => 
        item.id === editableItem.id ? { ...editableItem, deadline: selectedDate } : item
      ));
      setModalVisible(false);
    }
  };

  // Handle date change
  const onDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setEditableItem({ ...editableItem, deadline: date.toISOString() }); // Store date as ISO string
    }
  };

  // Render the delete action (right swipe)
  const renderRightActions = (itemId) => (
    <View style={styles.deleteContainer}>
      <TouchableOpacity
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
        style={styles.touchableAreaForDelete} // Style for the larger press area
        activeOpacity={0.7} // Adjust the opacity on press
      >
        <Text style={styles.deleteText}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render the edit action (left swipe)
  const renderLeftActions = (item) => (
    <View style={styles.editContainer}>
      <TouchableOpacity
        onPress={() => openEditModal(item)}
        style={styles.touchableArea} // Style for the larger press area
        activeOpacity={0.7} // Adjust the opacity on press
      >
        <Text style={styles.editText}>
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render a single to-do item with swipeable actions and a checkbox
  const renderItem = ({ item }) => {
    const deadlineLabel = getDeadlineLabel(item.deadline);
    const itemBackgroundColor = item.completed ? '#81E8F9' : '#F2BF91';

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id)}
        renderLeftActions={() => renderLeftActions(item)}
      >
        <View style={[styles.item, { backgroundColor: itemBackgroundColor }]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.task_title}</Text>
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

  // Check deadline date whether it's tomorrow or today
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
      return deadlineDate.toLocaleDateString(); // Return formatted date string
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for editing the to-do item */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit To-Do Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={editableItem?.task_title}
              onChangeText={(text) => setEditableItem({ ...editableItem, task_title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Details"
              value={editableItem?.details}
              onChangeText={(text) => setEditableItem({ ...editableItem, details: text })}
            />
            
            {/* Deadline Input with Date Picker */}
            <TextInput
              style={styles.input}
              placeholder="Deadline"
              value={selectedDate.toLocaleDateString()} // Show the selected date as a string
              editable={false}
            />

            <DatePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={saveChanges}
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
    height: '89%',
    borderRadius: 10,
    marginVertical: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '89%',
    borderRadius: 10,
    marginVertical: 8,
  },
  touchableAreaForDelete: {
    padding: 15,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableArea: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20
  },
  saveButton: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 50,
    backgroundColor: '#F2BF91',
    borderColor: '#F2BF91',
    borderWidth: 1,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
  },
});
