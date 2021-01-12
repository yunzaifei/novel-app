import React, {useCallback, useEffect, useState} from 'react';
import {Tabs} from '@ant-design/react-native';
import {TabData} from '@ant-design/react-native/lib/tabs/PropsType';
// config
import {RANKING_TYPE} from 'config/enum';
// service
import {getAllRankingService} from 'services/Store';
// components
import ItemView from './TabsItem/ItemView';

const tabs: Array<TabData> = Object.keys(RANKING_TYPE).map((key) => ({
  key,
  title: RANKING_TYPE[key as keyof typeof RANKING_TYPE],
}));

interface RankingPrps {
  male: any;
  female: any;
  picture: any;
  epub: any;
}
type RankingKey = 'male' | 'female' | 'picture' | 'epub';

const TabsView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [rankings, setRankings] = useState<RankingPrps>();

  /**
   * 获取所有榜单
   */
  const getAllRanking = useCallback(() => {
    setRefreshing(true);
    getAllRankingService()
      .then((res) => {
        console.log(res);
        setRankings(res);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    getAllRanking();
  }, [getAllRanking]);

  return (
    <Tabs tabs={tabs}>
      {tabs.map(({key}) => (
        <ItemView
          key={key}
          data={rankings ? rankings[key as RankingKey] : []}
          refreshing={refreshing}
          onRefresh={getAllRanking}
        />
      ))}
    </Tabs>
  );
};

export default TabsView;
