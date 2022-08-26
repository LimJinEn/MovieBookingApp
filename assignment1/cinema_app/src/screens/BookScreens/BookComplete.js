import React, {Component} from 'react';
import {Text, View, ScrollView, Button, StyleSheet} from 'react-native';
let SQLite = require('react-native-sqlite-storage');
let common = require('../../../CommonData');
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class BookComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
      token: '',
      uid: '',
    };
    this.db = '';
    this._queryByLast = this._queryByLast.bind(this);
    this._getUser = this._getUser.bind(this);
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
          uid: data.id.toString(),
        });
        this._queryByLast(this.state.uid);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _queryByLast(uid) {
    this.db = SQLite.openDatabase(
      {name: uid, createFromLocation: '~db.sqlite'},
      this.openCallback,
      this.errorCallback,
    );
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM record ORDER BY ID DESC LIMIT 1',
        [],
        (tx, results) => {
          console.log(results.rows.item(0));
          this.setState({record: results.rows.item(0)});
        },
      ),
    );
  }

  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('userToken');
    console.log(token);
    this.setState({token});
    this._getUser();
    //this._queryByLast();
    this.props.navigation.setOptions({
      title: 'Booking Complete',
    });
  }

  render() {
    let record = this.state.record;

    return (
      <ScrollView style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 40}}>Your booking is successful !!</Text>
        <View>
          <Text style={styles.text}>Order id: {record ? record.id : ''}</Text>
          <Text style={styles.text}>Movie: {record ? record.title : ''}</Text>
          <Text style={styles.text}>
            Date and time: {record ? record.date : ''}{' '}
            {record ? record.time : ''}
          </Text>
          <Text style={styles.text}>
            Duration: {record ? record.duration : ''}
          </Text>
          <Text style={styles.text}>Quantity: {record ? record.seat : ''}</Text>
          <Text style={styles.text}>
            Total price: RM{record ? record.price : ''}
          </Text>
        </View>

        <Button
          title="Go Back"
          onPress={() => {
            this.props.navigation.navigate('BookHome');
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    lineHeight: 30,
    color: 'black',
  },
});
