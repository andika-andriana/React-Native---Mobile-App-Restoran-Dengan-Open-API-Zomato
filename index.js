/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Route from './Route';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Route);
