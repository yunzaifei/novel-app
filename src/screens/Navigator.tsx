import React from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShelfStack from 'screens/Shelf/index';
import StoreStack from 'screens/Store/index';
import MineStack from 'screens/Mine/index';
import {routers} from 'config/index';
import {colors} from 'styles/colors';

const Tab = createBottomTabNavigator();

const screenOptions: (props: {
  route: Route<string, object | undefined>;
  navigation: any;
}) => BottomTabNavigationOptions = ({route}) => ({
  tabBarIcon: ({focused, size, color}) => {
    let iconName = '';
    switch (route.name) {
      case routers.ShelfStack: {
        iconName = focused ? 'book' : 'book-outline';
        break;
      }
      case routers.StoreStack: {
        iconName = focused ? 'library' : 'library-outline';
        break;
      }
      case routers.MineStack: {
        iconName = focused ? 'person' : 'person-outline';
        break;
      }
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: colors.primary,
  inactiveTintColor: 'gray',
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name={routers.ShelfStack}
          component={ShelfStack}
          options={{tabBarLabel: '书架'}}
        />
        <Tab.Screen
          name={routers.StoreStack}
          component={StoreStack}
          options={{tabBarLabel: '书城'}}
        />
        <Tab.Screen
          name={routers.MineStack}
          component={MineStack}
          options={{tabBarLabel: '我的'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
