/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './src/services/i18n/i18n';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
