import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import HomeTabs from './HomeTabs'; // Import the bottom tab navigator

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      
      <Stack.Screen name="MainApp" component={HomeTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
