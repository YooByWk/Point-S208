/** @jsxImportSource @emotion/react */

import  { useState } from 'react'
import Flex from '@/components/shared/Flex'
import {
  Circle24Regular,
  CheckmarkCircle24Regular,
  ArrowDownload24Regular,
  Delete24Filled
} from '@fluentui/react-icons'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import  Spacing  from '@/components/shared/Spacing';
import type { CardType } from '@/types/cardType'



interface MultiSelectBarProps {
  selectedCards: number[]
  allCards: CardType[]
  setSelectedCards: (cards: number[]) => void
}

const MultiSelectBar = ({selectedCards, allCards, setSelectedCards}:MultiSelectBarProps) => {
  
  const handleSelectAll = () => {
    if (allCards.length === selectedCards.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(allCards.map(card => card.cardId));
    }
  }
  
  const handleDownload = () => {
    console.log('handleDownload: ', selectedCards);
    // id로 카드 정보 가져오기
    const selectedCardDetails: CardType[] = allCards.filter(card => selectedCards.includes(card.cardId));
    console.log('selectedCardDetails: ', selectedCardDetails);
  }
  
  const handleDelete = () => {
    console.log('handleDelete: ',selectedCards);
    
  }
  
  return (
    <Flex direction="row" align="center" justify="space-between" css={selectbarContainer} >
      <Flex direction="row" align="center" justify="space-around">
        {allCards.length === selectedCards.length ? <CheckmarkCircle24Regular onClick={handleSelectAll}/> : <Circle24Regular onClick={handleSelectAll}/> }
        <Spacing size={10} direction='horizontal'/>
        {selectedCards.length > 0 &&<Text typography="t9" color="themeMainBlue">
          {selectedCards.length}개 선택됨
        </Text>}
      </Flex>
      <Flex>
      <ArrowDownload24Regular onClick={handleDownload}/>
      <Delete24Filled onClick={handleDelete}/>
      </Flex>
    </Flex>
  )
}

export default MultiSelectBar

const selectbarContainer = css`
  padding-left: 7.5%;
  padding-right: 5%;
`