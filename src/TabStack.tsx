/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:43:06
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 15:34:03
 * @Description: 描述信息
 */
import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MineStack from '@/pages/Mine/Stack';
import BookStack from '@/pages/Book/Stack';
import { RouteEnum } from '@/utils/enum';

const Tab = createBottomTabNavigator();
const screenOptions: (props: {
  route: RouteProp<ParamListBase, string>;
}) => BottomTabNavigationOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = '';

    if (route.name === 'BookStack') {
      iconName = focused ? 'library' : 'library-outline';
    } else if (route.name === 'MineStack') {
      iconName = focused ? 'person' : 'person-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'teal',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

const TabStack = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={RouteEnum.BookStack}
        component={BookStack}
        options={{ tabBarLabel: '书架' }}
      />
      <Tab.Screen
        name={RouteEnum.MineStack}
        component={MineStack}
        options={{ tabBarLabel: '我的' }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
