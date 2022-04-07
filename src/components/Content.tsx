/*
 * @Author: zhao yunfei
 * @Date: 2022-04-02 14:22:36
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-04-07 11:53:30
 * @Description: 描述信息
 */
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  findNodeHandle,
  View,
} from 'react-native';
import styled from 'styled-components/native';

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin: 20px 10px;
`;
const ContentText = styled.Text`
  font-size: 14px;
  padding: 0 10px;
`;

interface ItemProps {
  title: string;
  content: string;
}
interface Props {
  prev: ItemProps;
  curr: ItemProps;
  next: ItemProps;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  onGetNext: () => void;
}

type onScrollType = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

const Content: FC<Props> = props => {
  const [startY, setStartY] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [LH, setLH] = useState(200);
  const [currTop, setCurrTop] = useState(0);
  const scrollNode = useRef<ScrollView>(null);
  const currNode = useRef<Text>(null);
  const nextNode = useRef<Text>(null);

  useEffect(() => {
    console.log('curr ============', isScroll);
    nextNode.current?.measureLayout(
      findNodeHandle(scrollNode.current) || 0,
      (left, top, width, height) => {
        console.log('measureLayout', left, top, width, height);
        setCurrTop(top);
        if (isScroll) {
          const position = top - LH + 100;
          console.log('LH', LH, 'position', position);
          scrollNode.current?.scrollTo({ x: 0, y: position, animated: false });
        }
      },
      () => {
        console.log('measureLayout erre');
      },
    );
  }, [LH, isScroll, props.curr]);

  const handleScrollBegin: onScrollType = ({ nativeEvent }) => {
    setStartY(nativeEvent.contentOffset.y);
  };
  const handleScrollEnd: onScrollType = ({ nativeEvent }) => {
    const y = nativeEvent.contentOffset.y;
    const lh = nativeEvent.layoutMeasurement.height;
    const h = nativeEvent.contentSize.height;
    const toBottom = y >= startY;
    // console.log('startY', startY, 'y', y, 'h', h, 'lh', lh, toBottom);
    if (toBottom && h - y < currTop) {
      props.onGetNext();
    }
    if (toBottom && h - y - lh < 100) {
      console.log('next', nativeEvent);
      props.onScrollNext();
      setLH(lh);
      setIsScroll(true);
    }
    if (!toBottom && y < 16) {
      console.log('prev', nativeEvent);
      props.onScrollPrev();
      setLH(lh);
      setIsScroll(true);
    }
  };
  const RenderItem = ({ title, content }: ItemProps) =>
    content ? (
      <Fragment>
        <TitleText>{title}</TitleText>
        <ContentText>{content}</ContentText>
      </Fragment>
    ) : null;

  return (
    <ScrollView
      ref={scrollNode}
      onScrollBeginDrag={handleScrollBegin}
      onScrollEndDrag={handleScrollEnd}>
      <RenderItem {...props.prev} />
      <View ref={currNode}>
        <RenderItem {...props.curr} />
      </View>
      <View ref={nextNode}>
        <RenderItem {...props.next} />
      </View>
    </ScrollView>
  );
};

export default Content;
