import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {withNavigation} from 'react-navigation';

class Footers extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor: '#3e2908'}}>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('Homes')}>
            <Icon name="home" style={{color: 'white'}} />
            <Text style={styles.fontScale}>Home</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('Makanan')}>
            <Icon name="restaurant" style={{color: 'white'}} />
            <Text style={styles.fontScale}>Makanan</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('Kota')}>
            <Icon name="globe" style={{color: 'white'}} />
            <Text style={styles.fontScale}>Kota</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate('Kategori')}>
            <Icon name="list" style={{color: 'white'}} />
            <Text style={styles.fontScale}>Kategori</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
export default withNavigation(Footers);

const styles = StyleSheet.create({
  fontScale: {
    fontSize: 8,
    color: 'white',
  },
});
