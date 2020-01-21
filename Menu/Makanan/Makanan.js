import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import Footers from '../Footers';
import axios from 'axios';

export default class Makanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenisMakanan: [],
      dataRestoran: [],
    };
  }
  getJenisMakanan = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=74`, {
        headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
      })
      .then(res => {
        this.setState({jenisMakanan: res.data.cuisines});
      });
  };

  getDataRestoran = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/search?start=30&count=5`, {
        headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
      })
      .then(res => {
        this.setState({dataRestoran: res.data.restaurants});
      });
  };

  componentDidMount() {
    this.getJenisMakanan();
    this.getDataRestoran();
  }
  static navigationOptions = {headerShown: false};
  render() {
    return (
      <View style={{flex: 1}}>
        <Content>
          <Text style={styles.fontHeading}>Jenis Masakan</Text>
          <Content horizontal style={{marginLeft: 10}}>
            {this.state.jenisMakanan.map((data, key) => {
              return (
                <View key={key}>
                  <Button bordered warning style={{margin: 5}}>
                    <Text style={styles.fontScale}>
                      {data.cuisine.cuisine_name}
                    </Text>
                  </Button>
                </View>
              );
            })}
          </Content>
          <Text style={styles.fontHeading}>Restoran</Text>
          <Content horizontal style={{marginLeft: 5}}>
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
                  <Card style={{width: 200}}>
                    <CardItem>
                      <Left>
                        <Text style={styles.fontResto}>
                          {data.restaurant.name}
                        </Text>
                      </Left>
                      <Right>
                        <Icon
                          name="pin"
                          style={{
                            marginRight: -10,
                            fontSize: 10,
                            color: '#583500',
                          }}
                        />
                      </Right>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        style={{height: 200, width: null, flex: 1}}
                        source={{
                          uri: image,
                        }}
                      />
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text style={styles.fontResto}>Jenis: </Text>
                      </Left>
                      <Left>
                        <Text style={styles.fontResto}>
                          {data.restaurant.cuisines}
                        </Text>
                      </Left>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </Content>
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
  fontHeading: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 10,
  },
  fontResto: {
    fontSize: 10,
    marginLeft: -10,
  },
});
