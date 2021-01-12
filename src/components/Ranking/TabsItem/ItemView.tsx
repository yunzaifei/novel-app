import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SegmentedControl } from '@ant-design/react-native';
import styled from 'styled-components/native';
import { RowView } from 'styles/component';
// components
import LeftView from './LeftView';
import BooksView from '../../Book/BooksView';

const tabs = ['周榜', '月榜', '总榜'];

const RightView = styled.View`
  flex: 1;
  align-items: center;
`;
const SegmentedView = styled(SegmentedControl)`
  width: 180px;
  margin-top: 10px;
`;

interface Props {
  data: Array<any>;
  refreshing: boolean;
  onRefresh: () => void;
}
const ItemView: FC<Props> = ({ data, refreshing, onRefresh }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rankingID, setRankingID] = useState('');

  useEffect(() => {
    if (data.length) {
      setRankingID(data[activeIndex]._id);
    }
  }, [activeIndex, data]);

  const onSegmentedChange = useCallback(
    (e) => {
      console.log('segmented', e.nativeEvent.selectedSegmentIndex, data[activeIndex]);
      const typeIndex = e.nativeEvent.selectedSegmentIndex;
      const { _id, monthRank, totalRank } = data[activeIndex];
      switch (typeIndex) {
        case 0: {
          setRankingID(_id);
          break;
        }
        case 1: {
          setRankingID(monthRank || _id);
          break;
        }
        case 2: {
          setRankingID(totalRank || _id);
          break;
        }
      }
    },
    [activeIndex, data],
  );

  return (
    <RowView>
      <LeftView
        data={data}
        refreshing={refreshing}
        onRefresh={onRefresh}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <RightView>
        <SegmentedView values={tabs} onChange={onSegmentedChange} />
        {useMemo(
          () => (
            <BooksView id={rankingID} />
          ),
          [rankingID],
        )}
      </RightView>
    </RowView>
  );
};

export default ItemView;
