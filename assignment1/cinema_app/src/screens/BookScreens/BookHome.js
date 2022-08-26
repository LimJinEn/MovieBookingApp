import React, {Component} from 'react';
import {
  Button,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const StackNav = createStackNavigator();

export default class BookHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
    };
  }

  componentDidMount() {
    let movieList = [
      {
        id: 1,
        title: 'Thor: Love and Thunder',
        description:
          'Thor embarks on a journey unlike anything hes ever faced -- a quest for inner peace. However...',
        poster: require('../../../assets/thor4.jpg'),
        price: '22.00',
        fulldesc:
          'Thor embarks on a journey unlike anything hes ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods. To combat the threat, Thor enlists the help of King Valkyrie, Korg and ex-girlfriend Jane Foster, who -- to his surprise -- inexplicably wields his magical hammer. Together, they set out on a harrowing cosmic adventure to uncover the mystery of the God Butchers vengeance.',
        duration: '118 m / 1 h 58 m',
        genre: 'Superhero, Action',
        rated: 'PG-13',
      },
      {
        id: 2,
        title: 'One Piece Film: Red',
        description:
          'Uta is a beloved singer, renowned for concealing her own identity when performing...',
        poster: require('../../../assets/onePiece.jpg'),
        price: '20.00',
        fulldesc:
          'Uta —the most beloved singer in the world. Renowned for concealing her own identity when performing, her voice has come to be described as “otherworldly.” Now, for the first time ever, Uta will reveal herself to the world at a live concert. As the venue fills with all kinds of Uta fans—excited pirates, the Navy watching closely, and the Straw Hats led by Luffy who simply came to enjoy her sonorous performance—the voice that the whole world has been waiting for is about to resound. The story begins with the shocking fact that she is Shanks daughter.',
        duration: '115 m / 1 h 55 m',
        genre: 'Anime, Action',
        rated: 'PG-13',
      },
    ];
    this.setState({movieList: movieList});

    this.props.navigation.setOptions({
      title: 'Booking',
    });
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.movieList}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => (
            <View style={{margin: 10, borderBottomWidth: 1}}>
              <TouchableHighlight
                underlayColor={'#cccccc'}
                onPress={() => {
                  this.props.navigation.navigate('MovieDetails', {
                    poster: item.poster,
                    title: item.title,
                    price: item.price,
                    fulldesc: item.fulldesc,
                    duration: item.duration,
                    genre: item.genre,
                    rated: item.rated,
                  });
                  //this.props.navigation.navigate ('MovieDetails');
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 120,
                        height: 180,
                        margin: 10,
                        borderRadius: 10,
                      }}
                      source={item.poster}></Image>
                    <View style={{padding: 10}}>
                      <Text>{item.description}</Text>
                      <Text>RM {item.price}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
          //keyExtractor={(item) => {item.id.toString()}}
        />
      </SafeAreaView>
    );
  }
}
