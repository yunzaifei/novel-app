/*
 * @Author: zhao yunfei
 * @Date: 2021-01-08 14:16:03
 * @LastEditTime: 2021-01-08 14:57:30
 * @Description: 书籍详情
 */
import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator, WhiteSpace } from '@ant-design/react-native';
import { Rating } from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
// config
import { IMAGE_URL } from 'config';
import { routers } from 'config/enum';
// services
import { getBookInfoService } from 'services/Book';
// tyings
import { NavRouteProps, BookInfoProp } from 'typings/types';
// styles
import theme from 'styles/theme';

const FooterHeight = 60;

const ContainerView = styled.View`
  flex: 1;
  border: 1px solid #ff0;
  position: relative;
  padding-bottom: ${FooterHeight}px;
`;
const InfoView = styled.View`
  flex-direction: row;
  padding: 10px 20px;
`;
const BookCover = styled.Image.attrs({ resizeMode: 'cover' })`
  width: 100px;
  height: 125px;
  margin-right: 30px;
`;
const RightView = styled.View`
  flex-grow: 1;
`;
const TitleText = styled.Text`
  font-size: 17px;
  max-width: 200px;
`;
const GrayText = styled.Text`
  color: ${theme.color_text_caption};
  margin-top: 5px;
`;
const RatingView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RatingText = styled(GrayText)`
  line-height: 15px;
  margin-left: 5px;
`;
const CardView = styled.View`
  padding: 10px;
`;
const ChapterView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ChapterInfo = styled.View`
  flex: 1;
`;
const ChapterText = styled.Text`
  font-size: 12px;
  margin-left: 20px;
  color: ${theme.color_text_caption};
`;
const FooterView = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${FooterHeight}px;
  background-color: ${theme.fill_base};
  flex-direction: row;
`;
const FooterButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.link_button_fill_tap};
`;
const FooterText = styled.Text`
  font-size: ${theme.button_font_size}px;
  color: ${theme.color_link};
`;
const FooterPButton = styled(FooterButton)`
  background-color: ${theme.primary_button_fill};
`;
const FooterPText = styled(FooterText)`
  color: ${theme.color_text_base_inverse};
`;

const BookInfo: FC<NavRouteProps> = ({ navigation, route }) => {
  const [data, setData] = useState<BookInfoProp>();
  const [params, setParams] = useState<object>();

  useEffect(() => {
    const { id, title } = route.params as any;
    console.log('id', id, 'title', title);
    if (title) {
      navigation.setOptions({ headerTitle: title });
    }
    if (id) {
      setParams(route.params);
      navigation.setOptions({ headerTitle: title });
      getBookInfoService(id).then((res) => {
        console.log('res', res);
        setData(res);
      });
    }
  }, [navigation, route.params]);

  if (!data) {
    return (
      <>
        <WhiteSpace size="lg" />
        <ActivityIndicator text="加载中..." />
      </>
    );
  } else {
    const {
      cover,
      title,
      author,
      isSerial,
      rating: { score },
      majorCate,
      minorCate,
      longIntro,
      updated,
      lastChapter,
    } = data;
    return (
      <ContainerView>
        <ScrollView>
          <InfoView>
            <BookCover source={{ uri: `${IMAGE_URL}${cover}` }} />
            <RightView>
              <TitleText>{title}</TitleText>
              <GrayText>作者：{author}</GrayText>
              <GrayText>分类：{`${majorCate}/${minorCate}`}</GrayText>
              <GrayText>状态：{isSerial ? '连载' : '完本'}</GrayText>
              <RatingView>
                <Rating imageSize={15} readonly startingValue={score / 2} tintColor="#f2f2f2" />
                <RatingText>{score}分</RatingText>
              </RatingView>
            </RightView>
          </InfoView>
          <CardView>
            <TitleText>简介</TitleText>
            <GrayText>{longIntro}</GrayText>
          </CardView>
          <CardView>
            <TitleText>目录</TitleText>
            <ChapterView onPress={() => navigation.navigate(routers.BookChapter, params)}>
              <Ionicons name="menu" size={25} color={theme.color_text_caption} />
              <ChapterInfo>
                <ChapterText>最近更新：{new Date(updated).toLocaleString()}</ChapterText>
                <ChapterText>{lastChapter}</ChapterText>
              </ChapterInfo>
              <Ionicons name="chevron-forward" size={25} color={theme.color_text_caption} />
            </ChapterView>
          </CardView>
        </ScrollView>
        <FooterView>
          <FooterButton onPress={() => console.log('加入书架')}>
            <FooterText>加入书架</FooterText>
          </FooterButton>
          <FooterPButton onPress={() => console.log('立即阅读')}>
            <FooterPText>立即阅读</FooterPText>
          </FooterPButton>
          <FooterButton onPress={() => console.log('全本缓存')}>
            <FooterText>全本缓存</FooterText>
          </FooterButton>
        </FooterView>
      </ContainerView>
    );
  }
};

export default BookInfo;
