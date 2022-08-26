import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';

import HistoryNav from '../screens/HistoryScreens/HistoryNav';
import Profile from '../screens/Profile';
import BookNav from '../screens/BookScreens/BookNav';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarActiveBackgroundColor: 'pink',
        // inactiveBackgroundColor: 'white',
        tabBarLabelStyle: {
          fontSize: 22,
        },
        tabBarStyle: {
          backgroundColor: 'lightgrey',
          borderRadius: 50,
        },
      }}>
      <Tab.Screen
        name="Booking"
        component={BookNav}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="book" size={20} color={'blue'} />;
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryNav}
        options={{
          headerShown: true,
          tabBarIcon: () => {
            return <Ionicons name="time" size={20} color={'#228B22'} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          tabBarIcon: () => {
            return <Ionicons name="person" size={20} color={'#8B8000'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
