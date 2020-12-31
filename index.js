/*
 * @Author: zhao yunfei
 * @Date: 2020-12-29 15:43:59
 * @LastEditTime: 2020-12-31 11:07:30
 * @Description: 项目入口
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
