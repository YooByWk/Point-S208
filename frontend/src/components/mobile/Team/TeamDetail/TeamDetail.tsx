import { dummyCardList } from '@/assets/data/dummyCardList';
import BackArrow from '@/components/shared/BackArrow';
import CardList from '@/components/shared/CardList';
import { CardListType } from '@/types/CardListType';
import { CardType } from '@/types/cardType';
import React from 'react';
import  MyDigitalCard  from '@components/mobile/MyCard/MyDigitalCard';
import { useRecoilValue } from 'recoil';
import { pageChanged } from '@stores/team'
const TeamDetail = () => {
    const cardList: CardListType = dummyCardList
  const cards: CardType[] = cardList[0].cards 
  const isPageChanged = useRecoilValue(pageChanged)
  return (
    <div>
      {!isPageChanged &&  <BackArrow/>}
      <CardList
      cardList={cardList}
      cards={cards}
      isTeam={true}
      />
    </div>
      
  );
};

export default TeamDetail;