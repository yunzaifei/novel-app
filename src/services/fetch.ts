/*
 * @Author: zhao yunfei
 * @Date: 2020-12-31 17:19:47
 * @LastEditTime: 2020-12-31 17:19:47
 * @Description: fetch封装
 */
import { BASE_URL } from 'config/index';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const httpApi = {
  get(url: string, params?: any) {
    let fetchUrl = new URL(BASE_URL + url);
    if (params) {
      fetchUrl.search = new URLSearchParams(params).toString();
    }
    return fetch(fetchUrl.href).then((res) => res.json());
  },
  post(url: string, body?: object) {
    const fetchUrl = BASE_URL + url;
    return fetch(fetchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};

export default httpApi;
