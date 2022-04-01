/*
 * @Author: zhao yunfei
 * @Date: 2022-03-22 15:32:38
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-31 11:34:58
 * @Description: 书籍阅读
 */
import React, { FC, useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { IBook, IBookSection, ISection, NavProps } from '@/typings/types';
import request from '@/services/request';
interface IRenderItem {
  item: ISection;
  index: number;
}

const Read: FC<NavProps> = ({ route }) => {
  const { bookID } = route.params as any;
  const [contents, setContents] = useState<Array<ISection>>([]);
  const mmkvMenuKey = `MENU_${bookID}`;
  const [book, setBook] = useMMKVObject<IBook>(mmkvMenuKey);
  const [aIndex, setAIndex] = useState(-1);
  // 获取章节列表
  useEffect(() => {
    if (bookID) {
      request
        .get(`/book/${bookID}`, { params: { fields: { sections: 1 } } })
        .then(res => {
          console.log('res', res);
          const resBook = res as unknown as IBook;
          setBook(resBook);
        });
    }
  }, [bookID, setBook]);
  // 获取章节内容
  useEffect(() => {
    if (book?.sections) {
      const item = book.sections[aIndex + 1] as IBookSection;
      if (item) {
        request.get(`/section/${item.sectionID}`).then(res => {
          const section = res as unknown as ISection;
          setContents(arr => {
            return [...arr, section];
          });
        });
      }
    }
  }, [aIndex, book?.sections]);

  const renderItem = ({ item }: IRenderItem) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };
  const handleContent = (index?: number) => {
    if (book?.sections) {
      const i = index === undefined ? aIndex : index;
      const item = book.sections[i + 1];
      if (item) {
        setAIndex(i + 1);
      }
    }
  };

  return (
    <FlatList
      data={contents}
      renderItem={renderItem}
      keyExtractor={a => a._id}
      initialNumToRender={1}
      ListEmptyComponent={<Text>加载中...</Text>}
      onEndReached={() => handleContent()}
      onEndReachedThreshold={0.2}
      // onRefresh={() => handleContent(-1)}
    />
  );
};

export default Read;
