import React, {Component} from 'react';
import {Text, View, Button, ScrollView, Alert} from 'react-native';
let SQLite = require('react-native-sqlite-storage');

export default class RecordDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      duration: '',
      genre: '',
      price: '',
      seat: '',
      time: '',
      uid: '',
    };
    this.db = '';
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'History',
    });
    this.setState({id: this.props.route.params.id});
    this.setState({title: this.props.route.params.title});
    this.setState({duration: this.props.route.params.duration});
    this.setState({genre: this.props.route.params.genre});
    this.setState({price: this.props.route.params.price});
    this.setState({seat: this.props.route.params.seat});
    this.setState({time: this.props.route.params.time});
    this.setState({uid: this.props.route.params.uid});
  }
  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }
  _delete() {
    Alert.alert('Confirm to delete ?', this.state.title, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db = SQLite.openDatabase(
            {name: this.state.uid, createFromLocation: '~db.sqlite'},
            this.openCallback,
            this.errorCallback,
          );
          this.db.transaction(tx => {
            tx.executeSql('DELETE FROM record WHERE id = ?', [this.state.id]);
          });
          this.props.route.params.refresh(this.state.uid);
          this.props.navigation.goBack();
        },
      },
    ]);
  }

  render() {
    return (
      <ScrollView style={{margin: 10}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Order ID: {this.state.id}
          </Text>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {this.state.title}
          </Text>
          <Text style={{fontSize: 20}}>Seats: {this.state.seat}</Text>
          <Text style={{fontSize: 20}}>Duration: {this.state.duration}</Text>
          <Text style={{fontSize: 20}}>Genre: {this.state.genre}</Text>
          <Text style={{fontSize: 20}}>Time: {this.state.time}</Text>
          <Text style={{fontSize: 20}}>Price: RM {this.state.price}</Text>
        </View>
        <Button
          title="Delete Record"
          onPress={() => {
            this._delete();
          }}
        />
      </ScrollView>
    );
  }
}
