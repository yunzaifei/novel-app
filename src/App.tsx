/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 09:51:35
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-18 17:20:57
 * @Description: 描述信息
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
