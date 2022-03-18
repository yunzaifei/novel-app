/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:49:28
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-18 17:20:41
 * @Description: 描述信息
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MineScreen from './Mine';

const Stack = createNativeStackNavigator();

const MineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MineScreen"
        component={MineScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MineStack;
