/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:55:46
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 14:57:56
 * @Description: 描述信息
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteEnum } from '@/utils/enum';
import BookScreen from '@/pages/Book/Book';

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteEnum.BookScreen}
        component={BookScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookStack;
