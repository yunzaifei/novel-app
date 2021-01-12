/*
 * @Author: zhao yunfei
 * @Date: 2021-01-08 17:11:28
 * @LastEditTime: 2021-01-08 17:11:44
 * @Description: 章节目录
 */
import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getBookChaptersService } from 'services/Book';
import { NavRouteProps } from 'typings/types';

const Chapter: FC<NavRouteProps> = ({ navigation, route }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const { id, title } = route.params as any;
    console.log('id', id, 'title', title);
    if (title) {
      navigation.setOptions({ headerTitle: title });
    }
    if (id) {
      getBookChaptersService(id).then((res) => {
        console.log('res', res);
        const {
          mixToc: { chapters: resChapters },
        } = res;
        setChapters(resChapters);
      });
    }
  }, [navigation, route.params]);

  return (
    <View>
      {chapters.map((item) => (
        <Text>{JSON.stringify(item)}</Text>
      ))}
    </View>
  );
};

export default Chapter;
