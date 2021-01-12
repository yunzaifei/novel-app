/*
 * @Author: zhao yunfei
 * @Date: 2021-01-04 10:03:04
 * @LastEditTime: 2021-01-04 10:03:04
 * @Description: 数据信息API
 */
import httpApi from 'services/fetch';

/**
 * 书籍详情
 * @param bookid 书籍id
 */
export function getBookInfoService(bookid: string) {
  return httpApi.get(`/book/${bookid}`);
}
/**
 * 书籍章节
 * @param {string} bookid 书籍id
 */
export function getBookChaptersService(bookid: string) {
  return httpApi.get(`/mix-atoc/${bookid}?view=chapters`);
}
