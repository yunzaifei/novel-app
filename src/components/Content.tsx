/*
 * @Author: zhao yunfei
 * @Date: 2022-04-02 14:22:36
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-04-02 18:00:35
 * @Description: 描述信息
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  findNodeHandle,
} from 'react-native';

interface Props {
  prev: string;
  curr: string;
  next: string;
  onScrollPrev: () => void;
  onScrollNext: () => void;
}

type onScrollType = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

const Content: FC<Props> = props => {
  const [startY, setStartY] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [LH, setLH] = useState(200);
  const scrollNode = useRef<ScrollView>(null);
  const currNode = useRef<Text>(null);
  const nextNode = useRef<Text>(null);

  useEffect(() => {
    console.log('curr ============');
    if (isScroll) {
      nextNode.current?.measureLayout(
        findNodeHandle(scrollNode.current) || 0,
        (left, top, width, height) => {
          console.log('measureLayout', left, top, width, height);
          const position = top - LH + 100;
          console.log('LH', LH, 'position', position);
          scrollNode.current?.scrollTo({ x: 0, y: position, animated: false });
        },
        () => {
          console.log('measureLayout erre');
        },
      );
    }
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
    if (toBottom && h - y - lh < 16) {
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
  return (
    <ScrollView
      ref={scrollNode}
      onScrollBeginDrag={handleScrollBegin}
      onScrollEndDrag={handleScrollEnd}>
      <Text>{props.prev}</Text>
      <Text ref={currNode}>{props.curr}</Text>
      <Text ref={nextNode}>{props.next}</Text>
    </ScrollView>
  );
};

export default Content;
