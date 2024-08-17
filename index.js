/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { LogBox } from 'react-native';

AppRegistry.registerComponent('main', () => App);
LogBox.ignoreLogs(['Require cycle'])