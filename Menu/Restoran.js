import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Content, Card, CardItem, Left, Right, Icon, Text} from 'native-base';
import Footers from './Footers';
import axios from 'axios';

var res_id = '';

export default class Restoran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailRestoran: [],
    };
  }

  getDetailRestoran = () => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`,
        {
          headers: {'user-key': '04a50fd073aea95179306b9f6cbffa91'},
        },
      )
      .then(res => {
        this.setState({DetailRestoran: res.data});
      });
  };

  componentDidMount() {
    this.getDetailRestoran();
  }

  static navigationOptions = ({navigation}) => {
    res_id = navigation.getParam('res_id');
    return {
      title: navigation.getParam('nama_resto'),
    };
  };

  render() {
    var alamat = {...this.state.DetailRestoran.location};
    var image = '';
    if (this.state.DetailRestoran.featured_image === '') {
      image =
        'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    } else {
      image = this.state.DetailRestoran.featured_image;
    }
    return (
      <View style={{flex: 1}}>
        <Content>
          <Card>
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
                <Text style={styles.fontScale}>Alamat Restoran:</Text>
              </Left>
              <Left>
                <Text style={styles.fontScale}>{alamat.address}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="star" style={styles.star} />
                <Text style={styles.fontScale}>4.9</Text>
              </Left>
              <Right>
                <Icon name="chatboxes" style={styles.bubble} />
                <Text style={styles.fontScale}>
                  {this.state.DetailRestoran.all_reviews_count}
                </Text>
              </Right>
            </CardItem>
            <Card>
              <CardItem>
                <Left>
                  <Text style={styles.fontScale}>Jenis Masakan:</Text>
                </Left>
                <Left>
                  <Text style={styles.fontScale}>
                    {this.state.DetailRestoran.cuisines}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </Card>
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
  star: {
    fontSize: 12,
    color: 'yellow',
  },
  bubble: {
    fontSize: 15,
    color: '#583500',
  },
});
