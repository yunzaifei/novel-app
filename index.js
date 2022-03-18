/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 09:51:35
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-18 17:12:23
 * @Description: 入口文件
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
