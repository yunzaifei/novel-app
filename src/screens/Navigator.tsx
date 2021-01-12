import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// config
import {routers} from 'config/enum';
// screens
import TabStack from './TabStack';
import BookInfoScreen from 'screens/Store/BookInfo';
import ChapterScreen from 'screens/Store/Chapter';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routers.HomeStack}
          component={TabStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routers.BookInfo}
          component={BookInfoScreen}
          options={{headerTitle: '书籍详情'}}
        />
        <Stack.Screen
          name={routers.BookChapter}
          component={ChapterScreen}
          options={{headerTitle: '书籍目录'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
