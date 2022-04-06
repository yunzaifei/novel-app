/*
 * @Author: zhao yunfei
 * @Date: 2022-03-22 15:32:38
 * @LastEditors: zhao yunfei
 * @LastEditTime: 2022-04-06 15:05:48
 * @Description: 书籍阅读
 */
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useMMKV, useMMKVObject } from 'react-native-mmkv';
import { IBook, IBookSection, ISection, NavProps } from '@/typings/types';
import request from '@/services/request';
import Content from '@/components/Content';

const Read: FC<NavProps> = ({ route }) => {
  const { bookID } = route.params as any;
  const storage = useMMKV();
  const mmkvBookKey = `BOOK_${bookID}`;
  const [book, setBook] = useMMKVObject<IBook>(mmkvBookKey);
  const [aIndex, setAIndex] = useState(0);
  const [read, setRead] = useState({
    prev: '',
    curr: '',
    next: '',
  });
  // 获取章节列表
  useEffect(() => {
    if (bookID) {
      if (!book) {
        request
          .get(`/book/${bookID}`, { params: { fields: { sections: 1 } } })
          .then(res => {
            console.log('res', res);
            const resBook = res as unknown as IBook;
            setBook(resBook);
          });
      }
    }
  }, [book, bookID, setBook]);
  // 获取章节内容
  const getSection = useCallback(
    async index => {
      if (book?.sections) {
        console.log('index', index);
        const item = book.sections[index] as IBookSection;
        console.log('item', item);
        if (item) {
          let section: ISection;
          const mmkvSectionKey = `SECTION_${item.sectionID}`;
          const jsonSection = storage.getString(mmkvSectionKey);
          if (jsonSection) {
            section = JSON.parse(jsonSection);
          } else {
            const res = await request.get(`/section/${item.sectionID}`);
            section = res as unknown as ISection;
            const { title, content } = section;
            storage.set(mmkvSectionKey, JSON.stringify({ title, content }));
          }
          return `${section.title}\r\n${section.content}`;
        }
      }
      return '';
    },
    [book?.sections, storage],
  );

  useEffect(() => {
    console.log('aIndex', aIndex);
    const asyncFun = async () =>
      setRead({
        prev: await getSection(aIndex - 1),
        curr: await getSection(aIndex),
        next: await getSection(aIndex + 1),
      });
    asyncFun();
  }, [aIndex, getSection]);

  const handleIndex = (index: number) => {
    if (index > -1 && index < (book?.sections?.length || 0)) {
      setAIndex(index);
    }
  };

  return (
    <Fragment>
      <Content
        {...read}
        onScrollPrev={() => handleIndex(aIndex - 1)}
        onScrollNext={() => handleIndex(aIndex + 1)}
      />
    </Fragment>
  );
};

export default Read;
