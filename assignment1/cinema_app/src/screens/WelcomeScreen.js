import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View>
        <Text
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: '#20315f',
            paddingBottom: 100,
          }}>
          Welcome
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={{
            backgroundColor: 'blue',
            padding: 20,
            width: '90%',
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
