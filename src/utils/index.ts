/*
 * @Author: zhao yunfei
 * @Date: 2022-03-22 11:41:33
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-03-22 11:43:27
 * @Description: 通用方法
 */
import dayjs from 'dayjs';

/**
 * 格式化时间
 * @param value 时间值
 * @param format 格式化类型
 * @returns 格式化时间结果
 */
export const dateFormat = (value: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format);
};
