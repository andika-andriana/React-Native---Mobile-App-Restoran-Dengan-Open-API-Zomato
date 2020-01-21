import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  Container,
  View,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
} from 'native-base';
import Footers from '../Footers';
import axios from 'axios';

export default class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKatagori: [],
      dataCollections: [],
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

  getDataCollections = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/collections?city_id=74`, {
        headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
      })
      .then(res => {
        this.setState({dataCollections: res.data.collections});
      });
  };

  componentDidMount() {
    this.getDataKatagori();
    this.getDataCollections();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Container style={{flex: 3}}>
          <Content>
            {this.state.dataCollections.map((data, key) => {
              var image = '';
              if (data.collection.image_url === '') {
                image =
                  'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
              } else {
                image = data.collection.image_url;
              }
              return (
                <Card key={key}>
                  <CardItem cardBody>
                    <Image
                      style={{height: 200, width: null, flex: 1}}
                      source={{
                        uri: image,
                      }}
                    />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{data.collection.title}</Text>
                      <Text note>{data.collection.description}</Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}
          </Content>
        </Container>
        <Container style={{flex: 1}}>
          <Text style={{marginTop: 10, marginLeft: 10, fontSize: 12}}>
            Kategori :
          </Text>
          <Content horizontal>
            {this.state.dataKatagori.map((data, key) => {
              return (
                <Button bordered warning key={key} style={{margin: 5}}>
                  <Text style={styles.fontScale}>{data.categories.name}</Text>
                </Button>
              );
            })}
          </Content>
        </Container>
        <Footers />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fontScale: {
    fontSize: 8,
  },
});
