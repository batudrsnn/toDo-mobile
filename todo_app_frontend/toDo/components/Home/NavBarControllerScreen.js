import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from './ToDoScreen';
import ProfileScreen from './ProfileScreen';
import AddToDoScreen from './AddToDoScreen';
import { Button } from 'react-native';
import initialTodoItems from './todoSampleData';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ToDoStack() {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      //console.log("token:", token);
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
    fetchTodos();
  }, []);

  const addNewItem = (newTask) => {
    setTodoItems((prevItems) => [...prevItems, newTask]);
  };

  return (
    <Stack.Navigator>
      {/* ToDoMain screen with a header button to navigate to AddToDo */}
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

      {/* AddToDo screen for adding new to-do items */}
      <Stack.Screen
        name="AddToDo"
        options={{ title: 'Add New To-Do' }}
      >
        {(props) => <AddToDoScreen {...props} addNewItem={addNewItem} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function NavBarControllerScreen() {
  return (
    <Tab.Navigator>
      {/* Tab.Screen's header is disabled for the ToDoStack */}
      <Tab.Screen
        name="ToDoTab"
        component={ToDoStack}
        options={{ headerShown: false, tabBarLabel: 'To Do' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
