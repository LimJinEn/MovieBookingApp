import React from 'react';
import {View, Text} from 'react native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/Signin';
import SignUpScreen from '../screens/Signup';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="WelcomeScreen"
        component={WelcomeScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="Signup"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
