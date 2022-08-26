import React, {Component, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import axios from 'axios';

const _onPressButton = (name, password, email) => {
  if (
    name == null ||
    password == null ||
    email == null ||
    email.indexOf('@') == -1
  ) {
    Alert.alert('invalid email or password');
  } else {
    axios
      .post('http://10.0.2.2:3001/users/register', {name, password, email})
      .then(res => {
        console.log(res.data);

        Alert.alert('Signup Successful');
      })
      .catch(e => {
        console.log('Login error ${e}');
      });
  }
};

const Signup = ({navigation}) => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  return (
    <View style={{margin: 10}}>
      <Text style={styles.tx}>Signup</Text>
      <View style={styles.ip}>
        <Input
          placeholder="UserName"
          leftIcon={<Icon name="user" size={24} color="black" />}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Password"
          leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            _onPressButton(name, password, email);
          }}
          underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>SignUp</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 200,
  },
  pd: {
    padding: 20,
  },
  tx: {
    paddingTop: 60,
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
});
