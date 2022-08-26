import React, {useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{paddingVertical: 15}}>
          <Ionicons name="log-out-outline" size={22} />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
