import React, {useContext, useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../context/AuthContext';

const Stack = createStackNavigator();

function AppNav() {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>;
  }
  // const {user, setUser} =useContext (AuthContext);
  //   const[initializing,setInitializing]=useState(true);
  //   const onAuthStateChanged = (user)=>{
  //     setUser(user);
  //     if(initializing)
  //     setInitializing(false);
  //   }

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  // if(initializing) return null;
  //   const {isLoading, userToken} =useContext (AuthContext);

  // if(isLoading){
  //   return(
  //   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
  //     <ActivityIndicator size={'large'} />
  //   </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {/* {user ? <AppStack/>: <AuthStack/>} */}
      {userToken != null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNav;
