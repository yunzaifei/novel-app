/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:43:06
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 15:49:59
 * @Description: 底部堆栈
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

    if (route.name === RouteEnum.BookStack) {
      iconName = focused ? 'library' : 'library-outline';
    } else if (route.name === RouteEnum.MineStack) {
      iconName = focused ? 'person' : 'person-outline';
    }

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
