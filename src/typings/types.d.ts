/*
 * @Author: zhao yunfei
 * @Date: 2021-01-08 14:43:47
 * @LastEditTime: 2021-01-08 14:43:47
 * @Description: 通用类接口定义
 */
import { NavigationProp, Route } from '@react-navigation/native';

export interface NavProps {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
}

export interface NavRouteProps {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
  route: Route<string, object | undefined>;
}

/**
 * 书籍详情
 */
interface BookInfoProp {
  /**
   * 封面图
   */
  cover: string;
  /**
   * 书名
   */
  title: string;
  /**
   * 作者
   */
  author: string;
  /**
   * 是否连载
   */
  isSerial: boolean;
  /**
   * 留存率
   */
  retentionRatio: string;
  /**
   * 大分类
   */
  majorCate: string;
  /**
   * 小分类
   */
  minorCate: string;
  /**
   * 简介（长）
   */
  longIntro: string;
  /**
   * 最新章节
   */
  lastChapter: string;
  /**
   * 更新时间
   */
  updated: string;
  /**
   * 得分
   */
  rating: {
    score: number;
  };
  /**
   * 标签
   */
  tags: Array<string>;
}
