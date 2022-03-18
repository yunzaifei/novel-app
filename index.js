/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 09:51:35
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-18 10:17:26
 * @Description: 入口文件
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
