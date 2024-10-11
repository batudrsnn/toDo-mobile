// MyTeamsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import MyTeamsScreen from './MyTeamsScreen';

const Stack = createStackNavigator();

export default function MyTeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTeams"
        component={MyTeamsScreen}
        options={({ navigation }) => ({
          title: 'My Teams',
          headerLeft: null,
          headerRight: () => (
            <Button
              onPress={null}
              title="Add New Team"
              color="#000"
            />
          ),
        })}
      />
      
    </Stack.Navigator>
  );
}
