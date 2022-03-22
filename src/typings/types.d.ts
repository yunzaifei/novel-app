/*
 * @Author: zhao yunfei
 * @Date: 2022-03-22 09:48:39
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 11:11:57
 * @Description: 通用类型定义
 */
export interface NavProps {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
  route?: Route<string, object | undefined>;
}

/**
 * 最新章节
 */
interface ILastSection {
  title: string;
  updateAt: string;
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
  sections?: Array<ISection>;
  source?: ISource;
}
