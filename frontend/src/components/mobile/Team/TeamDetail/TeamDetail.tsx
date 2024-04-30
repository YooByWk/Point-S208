import { dummyCardList } from '@/assets/data/dummyCardList';
import BackArrow from '@/components/shared/BackArrow';
import CardList from '@/components/shared/CardList';
import { CardListType } from '@/types/CardListType';
import { CardType } from '@/types/cardType';
import React from 'react';
import  MyDigitalCard  from '@components/mobile/MyCard/MyDigitalCard';

const TeamDetail = () => {
    const cardList: CardListType = dummyCardList
  const cards: CardType[] = cardList[0].cards 

  return (
    <div>
      <BackArrow/>
      <CardList
      cardList={cardList}
      cards={cards}
      isTeam={true}
      />
    </div>
      
  );
};

export default TeamDetail;