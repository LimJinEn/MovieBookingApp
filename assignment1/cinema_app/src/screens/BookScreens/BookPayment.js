import React, {Component} from 'react';
import {Text, View, Button, Switch, SafeAreaView} from 'react-native';
import {set} from 'react-native-reanimated';
import {PickerWithLabel} from '../../../UI.js';
let SQLite = require('react-native-sqlite-storage');
let common = require('../../../commonData.js');
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class BookPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      seats: '0',
      student: false,
      price: '20.00',
      method: '',
      date: '',
      time: '',
      genre: '',
      duration: '',
      record: [],

      token: '',
      uid: '',
    };
    this._getUser = this._getUser.bind(this);
    this._insert = this._insert.bind(this);
    this.db = '';
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  _insert() {
    this.db = SQLite.openDatabase(
      {name: this.state.uid},
      this.openCallback,
      this.errorCallback,
    );
    this.db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO record(title,duration,genre,price,seat,time,date) VALUES(?,?,?,?,?,?,?)',
        [
          this.state.title,
          this.state.duration,
          this.state.genre,
          this.state.price,
          this.state.seats,
          this.state.time,
          this.state.date,
        ],
      );
    });
    console.log('Insert complete');
  }

  openCallback() {
    console.log('Database opened');
  }

  errorCallback() {
    console.log('SQL Error: ' + err);
  }
  async componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Payments',
    });

    let token = await AsyncStorage.getItem('userToken');
    console.log(token);
    this.setState({token});
    this._getUser();
  }
  render() {
    let title = this.props.route.params.title;
    let duration = this.props.route.params.duration;
    let genre = this.props.route.params.genre;
    let seat = this.props.route.params.seats;
    let time = this.props.route.params.time;
    let date = this.props.route.params.date;

    let price;
    let student = this.state.student;
    if (student) {
      price = (Number(this.state.price) - 2).toString();
    } else {
      price = this.state.price;
    }
    let total = (
      Number(this.props.route.params.seats) * Number(price)
    ).toString();

    return (
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <Text>OrderID: {this.state.uid}</Text>
        <Text style={{fontSize: 25}}>Total: RM{total}</Text>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Student</Text>
          <Switch
            onValueChange={student => {
              this.setState({student});
            }}
            value={this.state.student}
          />
        </View>

        <PickerWithLabel
          label={'Payment Method'}
          textLabelStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 10,
          }}
          items={common.method}
          mode={'dialog'}
          selectedValue={this.state.method}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({method: itemValue});
          }}
          textStyle={{fontSize: 24}}></PickerWithLabel>

        <Button
          title="Proceed to Pay"
          onPress={() => {
            this.setState({title: title});
            this.setState({duration: duration});
            this.setState({genre: genre});
            this.setState({seats: seat});
            this.setState({date: common.getValue(common.dateSlot, date)});
            this.setState({time: common.getValue(common.timeSlot, time)});
            this.setState({price: total});
            this._insert();
            this.props.navigation.navigate('BookComplete', {
              title: this.state.title,
              seats: this.state.seats,
              price: this.state.price,
              date: this.state.dateSlot,
              time: this.state.timeSlot,
            });
          }}
        />
      </SafeAreaView>
    );
  }
}
