import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'screens/Mine/Home';
import {routers} from 'config/index';

const Stack = createStackNavigator();

const StoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routers.MineHome}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StoreStack;
