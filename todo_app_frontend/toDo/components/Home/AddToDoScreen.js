import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Alert } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

export default function AddToDoScreen({ navigation, addNewItem }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date()); // Current date

  const handleAddItem = () => {
    if (taskTitle && details) {
      const newTask = {
        id: Math.random().toString(),
        taskTitle,
        details,
        completed: false,
        deadline: formatDate(date),
      };
      addNewItem(newTask);
      navigation.goBack();
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
			<View style={styles.dateContainer}>
        <Text style={styles.label}>Deadline:</Text>
				<DatePicker
					value={date}
					mode="date"
					display="default"
					onChange={onChangeDate}
				/>
      </View>      

			<View style={styles.buttonContainer}>
				<Pressable
          onPress={handleAddItem}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
			</View>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  label: {
		fontSize: 16,
    marginRight: 10,
  },
	buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20
  },
	button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 50,
    backgroundColor: '#F2BF91',
    borderColor: '#F2BF91',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
  },
});
