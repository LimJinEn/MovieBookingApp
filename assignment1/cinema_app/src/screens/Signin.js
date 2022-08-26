import React, {Component, useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  Button,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';

import Logo from '../../assets/loginbackground.jpg';

// _onPressButton() {
//     Alert.alert('You tapped the button!')
//   }

const Signin = ({navigation}) => {
  ////state
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {login} = useContext(AuthContext);

  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image source={Logo} style={styles.root} />
      <View style={styles.pd}>
        <Text style={styles.tx}>Login</Text>

        <View style={styles.ip}>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="user" size={24} color="black" />}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            placeholder="Password"
            leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
            secureTextEntry={false}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.cna}>
              Create a new{' '}
              <Text
                style={styles.acc}
                onPress={() => {
                  navigation.navigate('signup');
                }}>
                account
              </Text>
            </Text>
            {/* 123@mail.com */}
          </View>
          <TouchableNativeFeedback
            onPress={() => {
              login(email, password);
            }}
            underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};
export default Signin;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 200,
  },
  pd: {
    padding: 20,
  },
  tx: {
    fontSize: 25,
    color: '#888',
    fontWeight: 'bold',
  },
  ip: {
    marginTop: 30,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },

  container: {
    paddingTop: 60,
    alignItems: 'center',
  },

  buttonText: {
    padding: 20,
    color: 'white',
  },

  cna: {
    color: 'blue',
    paddingBottom: 30,
    fontSize: 15,
  },

  acc: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
