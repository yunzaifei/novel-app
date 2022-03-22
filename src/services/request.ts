/*
 * @Author: zhao yunfei
 * @Date: 2022-03-21 16:54:18
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 11:19:14
 * @Description: axios网络请求
 */
import axios from 'axios';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { BASE_URL } from '@/config';

/**
 * 临时错误信息
 */
let tmpErrMsg = '';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

request.interceptors.request.use(
  config => {
    // console.log('reques config:', config);
    // const ticket = localStorage.getItem('ticket');
    // if (ticket) {
    //   config.headers = { ...config.headers, ticket };
    // }

    return config;
  },
  error => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  response => {
    // console.log('response:', response);
    const {
      status,
      data,
      data: { success, code, message: resMessage, result },
    } = response;
    // console.log('status:', status, 'success:', success, resMessage, result);

    if (status === 200) {
      if (code === 200 || success) {
        return Promise.resolve(
          result === null || result === undefined ? resMessage : result,
        );
      } else if (code >= 500 && code < 600) {
        handleError(resMessage || '服务端错误');
        return Promise.reject(null);
      } else {
        return Promise.resolve(data);
      }
    } else {
      console.error('Service Error:', resMessage);
      handleError(resMessage || '服务端错误');
      // return Promise.reject(new Error(resMessage)); //抛出异常，网络请求需要catch处理
      return Promise.reject(null); //不需要catch处理
    }
  },
  error => {
    let errMsg = '未知错误';
    if (!error) {
      return Promise.reject(error);
    }
    if (error.response) {
      console.error('Response Error:', error.response);
      errMsg = handleErrorMsg(error.response);
    }
    // 没有response(没有状态码)的情况
    // eg: 超时；断网；请求重复被取消；主动取消请求；
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(error)) {
        errMsg = '请求被取消!';
      } else if (error.stack && error.stack.includes('timeout')) {
        errMsg = '请求超时!';
      } else {
        errMsg = '连接服务器失败!';
      }
    }
    if (!tmpErrMsg) {
      handleError(errMsg);
      tmpErrMsg = errMsg;
      setTimeout(() => {
        tmpErrMsg = '';
      }, 1000);
    }
    return Promise.reject(error);
  },
);

/**
 * 显示错误信息
 * @param errMsg 错误信息
 */
const handleError = (errMsg: string) => {
  console.error(errMsg);
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      `Error: ${errMsg}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  } else {
    Alert.alert('Error', `Error:${errMsg}`);
  }
};

/**
 * 统一处理错误信息
 * @param response 错误对象中的response
 * @returns 错误信息
 */
const handleErrorMsg = (response: {
  status?: number;
  data?: { code?: number };
}) => {
  let errMsg = '';
  // let isToLogin = false;
  if (!response.status) {
    errMsg = '未知状态错误';
  }
  switch (response.data?.code || response.status) {
    case 200:
      errMsg = '错误响应也会有状态码为200的情况';
      break;
    case 400:
      errMsg = '请求错误(400)';
      break;
    case 401:
      errMsg = '未授权，请重新登录(401)';
      break;
    case 403:
      errMsg = '拒绝访问(403)';
      break;
    case 404:
      errMsg = '请求出错(404)';
      break;
    case 408:
      errMsg = '请求超时(408)';
      break;
    case 500:
      errMsg = '服务器错误(500)';
      break;
    case 501:
      errMsg = '服务未实现(501)';
      break;
    case 502:
      errMsg = '网络错误(502)';
      break;
    case 503:
      errMsg = '服务不可用(503)';
      break;
    case 504:
      errMsg = '网络超时(504)';
      break;
    case 505:
      errMsg = 'HTTP版本不受支持(505)';
      break;
    default:
      errMsg = `连接出错，状态码：(${response.status})!`;
  }
  return errMsg;
};

export default request;
