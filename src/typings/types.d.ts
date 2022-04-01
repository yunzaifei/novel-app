/*
 * @Author: zhao yunfei
 * @Date: 2022-03-22 09:48:39
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-30 15:18:12
 * @Description: 通用类型定义
 */
import { NavigationProp, Route } from '@react-navigation/native';

export interface NavProps {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
  route: Route<string, object | undefined>;
}

/**
 * 书籍章节
 */
export interface IBookSection {
  title: string;
  url: string;
  sectionID?: any;
}
/**
 * 最新章节
 */
interface ILastSection {
  title: string;
  updateAt: string;
}
/**
 * 书籍源
 */
interface ISource {
  sourceID?: any;
  hostUrl: string;
}
/**
 * 书籍
 */
export interface IBook {
  _id: string;
  name: string;
  author: string;
  cover: string;
  description: string;
  url: string;
  lastSection: ILastSection;
  sections?: Array<IBookSection>;
  source: ISource;
}
/**
 * 章节
 */
export interface ISection {
  _id: string;
  bookID: string;
  title: string;
  url: string;
  content: string;
  sourceID: string;
}
