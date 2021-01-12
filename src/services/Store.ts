/*
 * @Author: zhao yunfei
 * @Date: 2021-01-04 10:21:55
 * @LastEditTime: 2021-01-04 10:21:55
 * @Description: 书籍列表信息API
 */
import httpApi from 'services/fetch';

/**
 * 获取所有排行榜
 */
export function getAllRankingService() {
  return httpApi.get('/ranking/gender');
}
/**
 * @description: 获取单一排行榜
 * @param {string} id 排行榜ID
 */
export function getRankingService(id: string) {
  return httpApi.get(`/ranking/${id}`);
}
