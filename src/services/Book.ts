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
