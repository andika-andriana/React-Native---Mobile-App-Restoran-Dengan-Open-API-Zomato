/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Homes from './Menu/Home/Homes';
import Makanan from './Menu/Makanan/Makanan';
import Restoran from './Menu/Restoran';
import Kota from './Menu/Kota/Kota';
import Kategori from './Menu/Kategori/Kategori';

const RootStack = createStackNavigator(
  {
    Homes: Homes,
    Makanan: Makanan,
    Restoran: Restoran,
    Kota: Kota,
    Kategori: Kategori,
  },
  {
    initialRouteName: 'Homes',
  },
);

export default createAppContainer(RootStack);
