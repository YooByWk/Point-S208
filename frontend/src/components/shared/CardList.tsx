/** @jsxImportSource @emotion/react */

import type { CardType } from '@/types/cardType'
import type { CardListType } from '@/types/CardListType'
import CardThumbnail from './CardThumbnail'
import { dummyCardList } from '@/assets/data/dummyCardList'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import MultiSelectBar from '@/components/shared/MultiSelectBar'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import LargeButton from './LargeButton'
import ShareCard from '@/components/mobile/Team/ShareCard'

const CardList = () => {
  const cardList: CardListType = dummyCardList
  const cards: CardType[] = cardList[0].cards
  const [searchValue, setSearchValue] = useState('')
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isShare, setIsShare] = useState(false)
  // 공유창에서 선택한 명함을 저장하는 state를 별도로?
  
  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId],
    )
  }

  console.log(cards)
  return (
  <>
     {!isShare? (
      <>
      <SearchBox
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
        placeholder="팀 명함 검색"
        spacing={false}
      />
      <Spacing size={20} />
      <MultiSelectBar
        selectedCards={selectedCards}
        allCards={cards}
        setSelectedCards={setSelectedCards}
      />
      <Flex direction="column" justify="center" align="center">
        {cards.map(card => {
          return (
            <CardThumbnail
              cardInfo={card}
              key={card.cardId}
              onSelect={handleCardSelect}
              selectedCards={selectedCards}
            />
          )
        })}
        <Spacing size={40} direction="vertical" />
      </Flex>
      <div css={buttonCss}>
       <LargeButton text="명함 공유" width="80%" onClick={()=>setIsShare(!isShare)}/>
      </div> </>) :
      <>
      
      <ShareCard
        cards={cards}
        onSelect={handleCardSelect}
        selectedCards={selectedCards}
        handleCardSelect={handleCardSelect}
        setSelectedCards={setSelectedCards}
        setIsShare={setIsShare}
        isShare={isShare}
      />
      </>}
    </>
  
  )
}

export default CardList

const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 40px;
  /* display: flex; */
  /* align-items: center; */
`
