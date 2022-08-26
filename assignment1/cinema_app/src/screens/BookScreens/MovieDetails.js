import React, {Component} from 'react';
import {Text, View, Button, Image, ScrollView, StyleSheet} from 'react-native';

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster: '',
      description: '',
      duration: '',
      genre: '',
      rated: '',
      price: '',
    };
  }

  componentDidMount() {
    this.setState({title: this.props.route.params.title});
    this.state.poster = this.setState({poster: this.props.route.params.poster});
    this.setState({price: this.props.route.params.price});
    this.setState({description: this.props.route.params.fulldesc});
    this.setState({duration: this.props.route.params.duration});
    this.setState({genre: this.props.route.params.genre});
    this.setState({rated: this.props.route.params.rated});

    this.props.navigation.setOptions({
      title: 'Movie Details',
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.poster} source={this.state.poster} />
          <View style={styles.subContainer}>
            <Text style={styles.label}>Rated</Text>
            <Text style={styles.text}>{this.state.rated}</Text>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.text}>{this.state.duration}</Text>
            <Text style={styles.label}>Genre</Text>
            <Text style={styles.text}>{this.state.genre}</Text>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.text}>RM {this.state.price}</Text>
          </View>
        </View>
        <Text style={styles.label}>{this.state.title}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
        <Button
          title="Proceed to Booking"
          onPress={() => {
            this.props.navigation.navigate('BookOption', {
              poster: this.state.poster,
              title: this.state.title,
              price: this.state.price,
              genre: this.state.genre,
              duration: this.state.duration,
            });
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 180,
    height: 320,
    margin: 10,
    borderRadius: 10,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
});
