/*
 * @Author: zhao yunfei
 * @Date: 2020-12-31 11:43:07
 * @LastEditTime: 2020-12-31 11:43:07
 * @Description: 全局配置
 */
declare const global: {HermesInternal: null | {}};

/**
 * api请求
 */
export const API_URL = '';

/**
 * 是否启用Hermes引擎
 */
export const IsHermes = global.HermesInternal == null;

/**
 * 路由名称列表
 */
export enum routers {
  ShelfStack = 'Shelf.Stack',
  ShelfHome = 'Shelf.Home',
  StoreStack = 'Store.Stack',
  StoreHome = 'Store.Home',
  MineStack = 'Mine.Stack',
  MineHome = 'Mine.Home',
}
