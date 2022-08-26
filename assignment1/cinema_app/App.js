// import type {Node} from 'react';
import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import AppNav from './src/Navigation/AppNav';
import {AuthProvider} from './src/context/AuthContext';

// import {Text,View, SafeAreaView, TouchableOpacity, Image} from "react-native";
// import Logo from './assets/loginbackground.jpg';
// import LandingScreen from './src/screens/landingScreen';
// import TabBarNavigator from './src/screens/tabbarnavigator';

// import AuthStack from './src/Navigation/AuthStack';
// import AppStack from './src/Navigation/AppStack';

// const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
