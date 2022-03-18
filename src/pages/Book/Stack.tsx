/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:55:46
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-18 17:21:10
 * @Description: 描述信息
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookScreen from './Book';

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BookStack;
