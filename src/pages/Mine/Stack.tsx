/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:49:28
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 14:59:13
 * @Description: 描述信息
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteEnum } from '@/utils/enum';
import MineScreen from '@/pages/Mine/Mine';

const Stack = createNativeStackNavigator();

const MineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteEnum.MineScreen}
        component={MineScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MineStack;
