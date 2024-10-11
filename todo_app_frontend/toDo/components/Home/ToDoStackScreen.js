import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Alert } from 'react-native';
import ToDoScreen from './ToDoScreen';
import AddToDoScreen from './AddToDoScreen';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

export default function ToDoStackScreen() {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please log in again.');
        return;
      }

      const response = await fetch('http://161.35.151.187:8000/api/todos/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const todos = await response.json();
        setTodoItems(todos);
      } else {
        Alert.alert('Error', 'Failed to fetch todos.');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Something went wrong while fetching todos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchTodos();
  }, []);

  const addNewItem = (newTask) => {
    setTodoItems((prevItems) => [...prevItems, newTask]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToDoMain"
        options={({ navigation }) => ({
          title: 'To-Do List',
          headerLeft: null,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddToDo')}
              title="Add"
              color="#000"
            />
          ),
        })}
      >
        {(props) => <ToDoScreen {...props} todoItems={todoItems} setTodoItems={setTodoItems} />}
      </Stack.Screen>

      <Stack.Screen
        name="AddToDo"
        options={{ title: 'Add New To-Do' }}
      >
        {(props) => <AddToDoScreen {...props} addNewItem={addNewItem} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
