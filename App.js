import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './screens/Menu';
import Home from './screens/Home';
import Problem from './screens/Problem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="Problem" component={Problem}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}