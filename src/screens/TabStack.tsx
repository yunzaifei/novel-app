import React from 'react';
import {Route} from '@react-navigation/native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShelfScreen from 'screens/Shelf/Home';
import StoreScreen from 'screens/Store/Home';
import MineScreen from 'screens/Mine/Home';
import {routers} from 'config/enum';
import theme from 'styles/theme';

const Tab = createBottomTabNavigator();

const screenOptions: (props: {
  route: Route<string, object | undefined>;
  navigation: any;
}) => BottomTabNavigationOptions = ({route}) => ({
  tabBarIcon: ({focused, size, color}) => {
    let iconName = '';
    switch (route.name) {
      case routers.ShelfHome: {
        iconName = focused ? 'book' : 'book-outline';
        break;
      }
      case routers.StoreHome: {
        iconName = focused ? 'library' : 'library-outline';
        break;
      }
      case routers.MineHome: {
        iconName = focused ? 'person' : 'person-outline';
        break;
      }
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: theme.brand_primary,
  inactiveTintColor: 'gray',
};

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={routers.ShelfHome}
        component={ShelfScreen}
        options={{tabBarLabel: '书架'}}
      />
      <Tab.Screen
        name={routers.StoreHome}
        component={StoreScreen}
        options={{tabBarLabel: '书城'}}
      />
      <Tab.Screen
        name={routers.MineHome}
        component={MineScreen}
        options={{tabBarLabel: '我的'}}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
