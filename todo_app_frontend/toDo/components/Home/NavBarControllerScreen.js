import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from './ToDoScreen';
import ProfileScreen from './ProfileScreen';
import AddToDoScreen from './AddToDoScreen';
import { Button } from 'react-native';
import initialTodoItems from './todoSampleData'; // Replace with your actual data source

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ToDoStack() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);

  // Function to add a new to-do item
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
