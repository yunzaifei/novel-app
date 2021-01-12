import React, { FC } from 'react';
import { Route } from '@react-navigation/native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon } from '@ant-design/react-native';
import { IconNames } from '@ant-design/react-native/lib/icon';
import ShelfScreen from 'screens/Shelf/Home';
import StoreScreen from 'screens/Store/Home';
import MineScreen from 'screens/Mine/Home';
import { routers } from 'config/enum';
import theme from 'styles/theme';

const Tab = createBottomTabNavigator();

const screenOptions: (props: {
  route: Route<string, object | undefined>;
  navigation: any;
}) => BottomTabNavigationOptions = ({ route }) => ({
  tabBarIcon: ({ size, color }) => {
    let iconName: IconNames = 'home';
    switch (route.name) {
      case routers.ShelfHome: {
        // iconName = focused ? 'library' : 'library-outline';
        iconName = 'book';
        break;
      }
      case routers.StoreHome: {
        // iconName = focused ? 'library' : 'library-outline';
        iconName = 'database';
        break;
      }
      case routers.MineHome: {
        // iconName = focused ? 'person' : 'person-outline';
        iconName = 'user';
        break;
      }
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: theme.brand_primary,
  inactiveTintColor: 'gray',
};

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name={routers.ShelfHome} component={ShelfScreen} options={{ tabBarLabel: '书架' }} />
      <Tab.Screen name={routers.StoreHome} component={StoreScreen} options={{ tabBarLabel: '书城' }} />
      <Tab.Screen name={routers.MineHome} component={MineScreen} options={{ tabBarLabel: '我的' }} />
    </Tab.Navigator>
  );
};

export default Navigator;
