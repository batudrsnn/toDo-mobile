import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MyTeamsScreen from './MyTeamsScreen';
import MyTeamsStack from './MyTeamsStack';
import ProfileScreen from './ProfileScreen';
import AddToDoScreen from './AddToDoScreen';
import { Button, Alert} from 'react-native';
import initialTodoItems from './todoSampleData';
import * as SecureStore from 'expo-secure-store';
import ToDoStackScreen from './ToDoStackScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function NavBarControllerScreen() {
  return (
    <Tab.Navigator>
      {/* Tab.Screen's header is disabled for the ToDoStack */}
      <Tab.Screen
        name="My Teams"
        component={MyTeamsStack}
        options={{ headerShown: false, tabBarLabel: 'Team' }}
      />
      <Tab.Screen
        name="ToDoTab"
        component={ToDoStackScreen}
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
