import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, WhiteSpace} from '@ant-design/react-native';
import styled from 'styled-components/native';
// config
import {IMAGE_URL} from 'config';
// service
import {getRankingService} from 'services/Store';
// styles
import theme from 'styles/theme';
import {routers} from 'config/enum';

const BookView = styled.TouchableOpacity`
  padding: 5px 10px;
  flex-direction: row;
`;
const BookCover = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  height: 100px;
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
  font-size: 17px;
  max-width: 200px;
`;
const RateText = styled.Text`
  color: ${theme.brand_important};
`;
const GrayText = styled.Text`
  font-size: 12px;
  color: ${theme.color_text_caption};
  margin-top: 5px;
`;
const IntroView = styled.View`
  flex: 1;
  flex-direction: row;
`;
const IntroText = styled(GrayText).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  width: 0;
  flex: 1;
  flex-grow: 1;
`;

interface Props {
  id: string;
}
const Books: FC<Props> = ({id}) => {
  console.log('id', id);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getRanking = useCallback(() => {
    if (id) {
      setLoading(true);
      getRankingService(id)
        .then((res) => {
          console.log('res', res);
          const {
            ranking: {books: resBooks = []},
          } = res;
          setBooks(resBooks);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  console.log('books', books);
  const renderItem = ({item}: any) => {
    const {
      cover,
      title,
      author,
      majorCate,
      minorCate,
      shortIntro,
      retentionRatio,
    } = item;
    return (
      <BookView
        onPress={() =>
          navigation.navigate(routers.BookInfo, {id: item._id, title})
        }>
        <BookCover source={{uri: `${IMAGE_URL}${cover}`}} />
        <BookInfo>
          <TitleView>
            <TitleText>{title}</TitleText>
            <RateText>{retentionRatio}</RateText>
          </TitleView>
          <GrayText>{`${majorCate}/${minorCate} | ${author}`}</GrayText>
          <IntroView>
            <IntroText>简介：{shortIntro}</IntroText>
          </IntroView>
        </BookInfo>
      </BookView>
    );
  };

  return loading ? (
    <>
      <WhiteSpace size="lg" />
      <ActivityIndicator text="加载中..." />
    </>
  ) : (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item: any) => item._id}
      refreshing={loading}
      onRefresh={getRanking}
    />
  );
};

export default memo(Books);
