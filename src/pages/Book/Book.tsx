/*
 * @Author: zhao yunfei
 * @Date: 2022-03-18 14:56:59
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-30 14:46:47
 * @Description: 描述信息
 */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import request from '@/services/request';
import { IBook, NavProps } from '@/typings/types';
import { dateFormat } from '@/utils';
import { RouteEnum } from '@/utils/enum';

const BookView = styled.TouchableOpacity`
  padding: 5px 10px;
  flex-direction: row;
`;
const BookCover = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100px;
  height: 120px;
  margin-right: 10px;
`;
const BookInfo = styled.View`
  flex-grow: 1;
`;
const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  max-width: 200px;
  margin-bottom: 12px;
`;
const GrayText = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  flex-grow: 1;
`;

const Books: FC<NavProps> = ({ navigation }) => {
  const [books, setBooks] = useState<Array<IBook>>([]);
  const [loading, setLoading] = useState(false);

  // 获取书籍列表
  const getData = useCallback(() => {
    setLoading(true);
    request
      .get('/books', { params: { fields: { sections: 0 } } })
      .then(res => {
        console.log('res', res);
        const result = res as unknown as Array<IBook>;
        setBooks(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // 渲染FlatList子组件
  const renderItem = ({ item }: { item: IBook }) => {
    const {
      _id,
      name,
      cover,
      author,
      lastSection: { title, updateAt },
      source: { hostUrl },
    } = item;
    return (
      <BookView
        onPress={() =>
          navigation.navigate(RouteEnum.BookRead, { bookID: _id })
        }>
        <BookCover source={{ uri: `${hostUrl}${cover}` }} />
        <BookInfo>
          <TitleView>
            <TitleText>{name}</TitleText>
          </TitleView>
          <GrayText>{`作者：${author}`}</GrayText>
          <GrayText>{`最新：${title}`}</GrayText>
          <GrayText>{`⏱ ${dateFormat(updateAt)}`}</GrayText>
        </BookInfo>
      </BookView>
    );
  };
  return (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={a => a._id as unknown as string}
      refreshing={loading}
      onRefresh={getData}
    />
  );
};

export default Books;
