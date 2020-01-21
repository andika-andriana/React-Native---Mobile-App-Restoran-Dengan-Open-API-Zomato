import React, {Component} from 'react';
import {Container, Tab, Tabs, ScrollableTab} from 'native-base';
import RestoranKota from './RestoranKota';
import Footers from '../Footers';

export default class Kota extends Component {
  static navigationOptions = {headerShown: false};
  render() {
    return (
      <Container>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab style={{backgroundColor: '#784800'}} />
          )}>
          <Tab
            heading="Jakarta"
            tabStyle={{backgroundColor: '#784800'}}
            textStyle={{color: 'white'}}
            activeTabStyle={{backgroundColor: '#784800'}}
            activeTextStyle={{color: '#fff'}}>
            <RestoranKota nama="Jakarta" id_kota="74" />
          </Tab>
          <Tab
            heading="Bandung"
            tabStyle={{backgroundColor: '#784800'}}
            textStyle={{color: 'white'}}
            activeTabStyle={{backgroundColor: '#784800'}}
            activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <RestoranKota nama="Bandung" id_kota="11052" />
          </Tab>
          <Tab
            heading="Bali"
            tabStyle={{backgroundColor: '#784800'}}
            textStyle={{color: 'white'}}
            activeTabStyle={{backgroundColor: '#784800'}}
            activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <RestoranKota nama="Bali" id_kota="170" />
          </Tab>
        </Tabs>
        <Footers />
      </Container>
    );
  }
}
