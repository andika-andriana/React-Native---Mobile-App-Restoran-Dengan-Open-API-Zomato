import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {Content, Card, CardItem, Text, Body} from 'native-base';
import axios from 'axios';
import {withNavigation} from 'react-navigation';

class RestoranKota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRestoranKota: [],
      id_kota: this.props.id_kota,
    };
  }

  getDataRestoranKota = () => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${
          this.state.id_kota
        }&entity_type=city&count=5&sort=rating`,
        {
          headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
        },
      )
      .then(res => {
        this.setState({dataRestoranKota: res.data.restaurants});
      });
  };

  componentDidMount() {
    this.getDataRestoranKota();
  }

  render() {
    return (
      <Content>
        {this.state.dataRestoranKota.map((data, key) => {
          var image = '';
          if (data.restaurant.thumb === '') {
            image =
              'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
          } else {
            image = data.restaurant.thumb;
          }
          return (
            <View key={key}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Restoran', {
                    nama_resto: data.restaurant.name,
                    res_id: data.restaurant.R.res_id,
                  })
                }>
                <Card>
                  <CardItem>
                    <Body>
                      <Text style={styles.fontScale}>
                        {data.restaurant.name}
                      </Text>
                      <Text note style={styles.fontScale}>
                        {this.props.nama}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{height: 200, width: null, flex: 1}}
                      source={{
                        uri: image,
                      }}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        })}
      </Content>
    );
  }
}

export default withNavigation(RestoranKota);

const styles = StyleSheet.create({
  fontScale: {
    fontSize: 10,
  },
});
