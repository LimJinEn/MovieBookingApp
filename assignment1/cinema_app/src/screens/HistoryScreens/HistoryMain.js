import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require('react-native-sqlite-storage');

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      uid: '',
      token: '',
    };
    this._query = this._query.bind(this);
    this._getUser = this._getUser.bind(this);
    this.db = '';
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('userToken');
    console.log(token);
    this.setState({token});
    this._getUser();

    this._query();
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

        console.log(this.state.uid);
        this._query(this.state.uid);
      })
      .catch(error => {
        console.log(error);
      });
  }
  _query(uid) {
    this.db = SQLite.openDatabase(
      {name: uid, createFromLocation: '~db.sqlite'},
      this.openCallback,
      this.errorCallback,
    );
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM record ORDER BY id', [], (tx, results) =>
        this.setState({record: results.rows.raw()}),
      ),
    );
  }
  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.record}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('RecordDelete', {
                  id: item.id,
                  title: item.title,
                  duration: item.duration,
                  genre: item.genre,
                  price: item.price,
                  seat: item.seat,
                  time: item.time,
                  uid: this.state.uid,
                  refresh: this._query,
                });
              }}>
              <View style={{margin: 10}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                  {item.date},{item.title}
                </Text>
                <Text style={{fontSize: 25}}>Payment: RM {item.price}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
