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
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="signup"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
