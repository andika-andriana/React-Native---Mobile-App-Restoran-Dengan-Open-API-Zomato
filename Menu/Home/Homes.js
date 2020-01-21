import React, {Component} from 'react';
import Footers from '../Footers';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import ImageSlider from 'react-native-image-slider';
import {YellowBox} from 'react-native';
import axios from 'axios';

YellowBox.ignoreWarnings(['Warning: componentWillMount']);

export default class Homes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://images.pexels.com/photos/163046/welcome-to-our-home-welcome-tablet-an-array-of-163046.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://images.pexels.com/photos/631160/pexels-photo-631160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      dataKatagori: [],
      dataRestoran: [],
    };
  }

  static navigationOptions = {headerShown: false};

  getDataKatagori = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/categories`, {
        headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
      })
      .then(res => {
        this.setState({dataKatagori: res.data.categories});
      });
  };

  getDataRestoran = () => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?start=6&count=10&sort=rating`,
        {
          headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
        },
      )
      .then(res => {
        this.setState({dataRestoran: res.data.restaurants});
      });
  };

  componentDidMount() {
    this.getDataKatagori();
    this.getDataRestoran();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#784800" />
        <Content>
          <View style={{height: 150}}>
            {
              // ImageSlider
            }
            <ImageSlider
              images={this.state.images}
              autoPlayWithInterval={3000}
            />
          </View>
          {
            // Katagori
          }
          <Text style={styles.kategori}>Pilihan Kategori</Text>
          <Content horizontal>
            {this.state.dataKatagori.map((data, key) => {
              return (
                <Button bordered warning key={key} style={{margin: 5}}>
                  <Text style={styles.fontScale}>{data.categories.name}</Text>
                </Button>
              );
            })}
          </Content>
          {
            // Restoran Terbaik
          }
          <Text style={styles.kategori}>Restoran Terbaik</Text>
          {this.state.dataRestoran.map((data, key) => {
            var image = '';
            if (data.restaurant.thumb === '') {
              image =
                'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
            } else {
              image = data.restaurant.thumb;
            }
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  this.props.navigation.navigate('Restoran', {
                    nama_resto: data.restaurant.name,
                    res_id: data.restaurant.R.res_id,
                  })
                }>
                <Card>
                  <CardItem>
                    <Left>
                      <Text style={styles.fontScale}>
                        {data.restaurant.name}
                      </Text>
                      <Text note style={styles.fontScale}>
                        <Icon
                          style={{fontSize: 9, color: '#583500'}}
                          name="pin"
                        />{' '}
                        {data.restaurant.location.city}
                      </Text>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{height: 150, width: null, flex: 1}}
                      source={{
                        uri: image,
                      }}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Icon name="star" style={styles.star} />
                      <Text style={styles.fontScale}>
                        {data.restaurant.user_rating.aggregate_rating}
                      </Text>
                    </Left>
                    <Right>
                      <Text style={styles.fontScale}>
                        {data.restaurant.user_rating.rating_text}
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })}
        </Content>
        <Footers />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fontScale: {
    fontSize: 10,
  },
  kategori: {
    fontSize: 10,
    margin: 10,
    textAlign: 'center',
  },
  star: {
    fontSize: 12,
    color: 'yellow',
  },
});
