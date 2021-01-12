/*
 * @Author: zhao yunfei
 * @Date: 2021-01-04 11:47:25
 * @LastEditTime: 2021-01-04 11:47:25
 * @Description: 全局ENUM
 */

/**
 * 路由名称列表
 */
export enum routers {
  /**
   * 首页
   */
  HomeStack = 'Home.Stack',
  /**
   * 书架
   */
  ShelfHome = 'Shelf.Home',
  /**
   * 书城
   */
  StoreHome = 'Store.Home',
  /**
   * 书籍详情
   */
  BookInfo = 'Store.Book',
  /**
   * 书籍目录
   */
  BookChapter = 'Store.Chapter',
  /**
   * 我的
   */
  MineHome = 'Mine.Home',
}

/**
 * 榜单类型
 */
export enum RANKING_TYPE {
  /**
   * 男生榜单
   */
  male = '男生',
  /**
   * 女生榜单
   */
  female = '女生',
  /**
   * 漫画
   */
  picture = '漫画',
  /**
   * EPUB格式
   */
  epub = 'EPUB',
}
