/*
 * @Author: zhao yunfei
 * @Date: 2022-03-21 10:58:31
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-21 16:54:25
 * @Description: 网络请求
 */
import { Alert, Platform, ToastAndroid } from 'react-native';
import { BASE_URL } from '@/config/index';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const handleError = (e: any) => {
  console.error(e);
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      `Error: ${e}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  } else {
    Alert.alert('Error', `Error:${e.message}`);
  }
  return new Promise((resolve, reject) => {
    reject(new Error(e));
  });
};

const fetchApi = {
  get(url: string, params?: any) {
    try {
      let fetchUrl = new URL(BASE_URL + url);
      if (params) {
        for (let key in params) {
          fetchUrl.searchParams.append(key, params[key]);
        }
      }
      // console.log('fetchUrl', fetchUrl);
      return fetch(fetchUrl.href)
        .then(res => {
          return res.json().then(fetchData => {
            console.log('fetchData', fetchData);
            const { code, message, result } = fetchData;
            if (code === 200) {
              return result;
            } else {
              return handleError(new Error(message));
            }
          });
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (e: any) {
      return handleError(e);
    }
  },
  post(url: string, body?: object) {
    try {
      const fetchUrl = BASE_URL + url;
      return fetch(fetchUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
        .then(res => {
          return res.json().then(fetchData => {
            console.log('fetchData', fetchData);
            const { code, message, result } = fetchData;
            if (code === 200) {
              return result;
            } else {
              return handleError(new Error(message));
            }
          });
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (e: any) {
      return handleError(e);
    }
  },
};

export default fetchApi;
