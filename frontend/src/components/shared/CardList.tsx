/** @jsxImportSource @emotion/react */

import type { CardType } from '@/types/cardType'
import type { CardListType } from '@/types/CardListType'
import CardThumbnail from './CardThumbnail'
import { dummyCardList } from '@/assets/data/dummyCardList'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import MultiSelectBar from './MultiSelectBar'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import LargeModal from '@/components/shared/LargeModal'
import Text from '@shared/Text'

const CardList = () => {
  const cardList: CardListType = dummyCardList
  const cards: CardType[] = cardList[0].cards
  const [searchValue, setSearchValue] = useState('')
  const [selectedCards, setSelectedCards] = useState<number[]>([])
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
      <SearchBox
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
        placeholder="팀 명함 검색"
        spacing={false}
      />
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
      {/* 아래도 컴포화 */}
      <div css={buttonCss}>
        <LargeModal
          buttonText="명함 공유"
          dialogTitle="명함 공유"
          height="70vh"
          dialogContent={
            <>
              <Text typography="t9">공유할 명함을 선택해주세요</Text>
              <SearchBox
                value="공유할 명함 검색 로직"
                placeholder="공유할 명함 검색"
                memberIcon={false}
                filterIcon={false}
                sortIcon={false}
                width="100%"
              />
              <Spacing size={20} direction="vertical" />
              
              <Flex direction="column" justify="center" align="center">
                
                {cards.map(card => {
                  return (
                    <CardThumbnail
                      cardInfo={card}
                      key={card.cardId}
                      onSelect={handleCardSelect}
                      selectedCards={selectedCards}
                      scale={1}
                      forShare={true}
                    />
                  )
                })}
              </Flex>
            </>
          }
          /* */
          onClick={() => console.log('팀 추가')}
          actionButtonText="추가"
          btnWidth="80%"
        />
      </div>
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
