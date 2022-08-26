import React from 'react';
import {View, Text} from 'react native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomeScreen from '../screens/HomeScreen';
import AboutUs from '../screens/AboutUs';
import TabNavigator from './TabNavigator';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
        name="Home"
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="golf-outline" size={22} color={color} />
          ),
        }}
        name="About Us"
        component={AboutUs}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
