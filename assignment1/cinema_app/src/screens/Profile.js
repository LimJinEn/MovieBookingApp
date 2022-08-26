// import React, {Component} from "react";
// import {Text,View} from "react-native";

// export default class Profile extends Component{
//     render(){
//         return(
//             <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//             <Text style={{ fontSize:50}}>Home</Text>
//             </View>

//         )
//     }
// }

import React, {Component, useState} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Button,
  TouchableNativeFeedback,
  Alert,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      password: '',
      email: '',
    };
    //use this because when we use jiantou we need to use bind to point it back to here
    this._getUser = this._getUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log(123414);
    let url = 'http://10.0.2.2:3001/users/update';
    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        console.log(this.state.name);
        console.log(this.state.password);
        console.log(this.state.email);
        return response.json();
      })
      .then(async data => {
        console.log(data);
        // if (data.error) {
        //   this.setState({ errorUpdate: true })
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _getUser() {
    let url = 'http://10.0.2.2:3001/users';
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.state.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('userToken');
    console.log(token);
    this.setState({token});
    this._getUser();
  }

  render() {
    // const [name, setName] = useState(null);
    // const [password, setPassword] = useState(null);
    // const [email, setEmail] = useState(null);
    return (
      <ScrollView style={{margin: 10}}>
        <View style={styles.ip}>
          <Input
            placeholder="UserName"
            leftIcon={<Icon name="user" size={24} color="black" />}
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />

          <Input
            placeholder="Password"
            leftIcon={{type: 'font-awesome', name: 'chevron-left'}}
            secureTextEntry={false}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          <Input
            placeholder="Email"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            value={this.state.email}
            onChangeText={email => setState({email})}
          />
        </View>
        <View style={styles.container}>
          <TouchableNativeFeedback
            onPress={this.onSubmit}
            underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* <Text>test</Text>
                            <Text>{this.state.token}</Text>
                            <Text>{this.state.name}</Text>
                            <Text>{this.state.email}</Text>
                            <Text>{this.state.password}</Text> */}
      </ScrollView>
    );
  }
}

// export default Signup;
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
