import React, { FC } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import theme from 'styles/theme';

const ContainerView = styled.View`
  width: 70px;
`;

const ItemView = styled.TouchableOpacity<{ actived: boolean }>`
  padding: 10px 5px;
  background-color: ${(p) => (p.actived ? theme.fill_tap : theme.fill_body)};
  align-items: center;
`;

interface Props {
  data: Array<any>;
  refreshing: boolean;
  onRefresh: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Left: FC<Props> = ({ data, refreshing, onRefresh, activeIndex, setActiveIndex }) => {
  console.log('refreshing', refreshing);

  const renderItem = ({ item, index }: any) => (
    <ItemView actived={activeIndex === index} onPress={() => setActiveIndex(index)}>
      <Text>{item.shortTitle}</Text>
    </ItemView>
  );
  return (
    <ContainerView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ContainerView>
  );
};

export default Left;
