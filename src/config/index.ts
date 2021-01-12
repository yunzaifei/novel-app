/*
 * @Author: zhao yunfei
 * @Date: 2020-12-31 11:43:07
 * @LastEditTime: 2020-12-31 11:43:07
 * @Description: 全局配置
 */
declare const global: { HermesInternal: null | {} };

/**
 * api域名
 */
export const BASE_URL = 'http://api.zhuishushenqi.com';

/**
 * 图片域名
 */
export const IMAGE_URL = 'http://statics.zhuishushenqi.com';

/**
 * 章节域名
 */
export const CHAPTER_URL = 'http://chapterup.zhuishushenqi.com';

/**
 * 是否启用Hermes引擎
 */
export const IsHermes = global.HermesInternal == null;
