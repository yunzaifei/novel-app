/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 09:51:35
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-31 10:27:48
 * @Description: 入口页面
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { RouteEnum } from '@/utils/enum';
import TabStack from '@/TabStack';
import BookRead from '@/pages/Book/Read';

const storage = new MMKV();
if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteEnum.TabStack}
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={RouteEnum.BookRead} component={BookRead} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
