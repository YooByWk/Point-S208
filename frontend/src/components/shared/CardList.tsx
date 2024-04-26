/** @jsxImportSource @emotion/react */

import type { CardType } from '@/types/cardType'
import type { CardListType } from '@/types/CardListType'
import CardThumbnail from './CardThumbnail';
import { dummyCardList } from '@/assets/data/dummyCardList';
import  Flex  from '@/components/shared/Flex';
import  SearchBox  from '@/components/shared/SearchBox';
import { useState } from 'react';

const CardList = () => {
  const cardList: CardListType = dummyCardList
  const cards:CardType[] = cardList[0].cards
  const [searchValue, setSearchValue] = useState('')
  console.log(cards) 
  return (
    <>
    <SearchBox value={searchValue} onChange={(e: any) => setSearchValue(e.target.value)} placeholder='팀 명함 검색' />
      <Flex direction='column' justify='center' align='center'>
      {cards.map((card) => {
        return <CardThumbnail cardInfo={card} key={card.cardId} />
      })}
    </Flex>
    </>
)
};

export default CardList;