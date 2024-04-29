/** @jsxImportSource @emotion/react */
import { ArrowLeft24Regular } from '@fluentui/react-icons'
import { useCallback, useState } from 'react'
import Text from '@shared/Text'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import type { CardType } from '@/types/cardType'
import CardThumbnail from '@/components/shared/CardThumbnail'
import MultiSelectBar from '@/components/shared/MultiSelectBar'
import { tokens } from '@fluentui/react-components';

interface AddTeamProps {
  cards: CardType[]
  onSelect: (cardId: number) => void
  selectedCards: number[]
  handleCardSelect: (cardId: number) => void
  setSelectedCards: (cards: number[]) => void
  setIsShare: (isShare: boolean) => void
  isShare: boolean
}


const ShareCard = ({
  cards,
  selectedCards,
  handleCardSelect,
  setSelectedCards,
  setIsShare,
  isShare,
}: AddTeamProps) => {
  
  const handleBackArrow = () => {
    console.log('뒤로가기 버튼 클릭')
    setIsShare(!isShare)
  }
  
  return (
    <div>
      <Flex direction='row' onClick={handleBackArrow} css={arrowContainer}>
      <ArrowLeft24Regular />
      <Spacing size={10} direction='horizontal'/> 
      <Text typography='t7'>뒤로가기</Text>
      </Flex >
      <Spacing size={10} direction='vertical'/> 
      <Text typography="t5" bold={true} css={textCss}>공유할 명함을 선택해주세요</Text>
      <Spacing  size={10} />
      <SearchBox
        value="공유할 명함 검색 로직"
        placeholder="공유할 명함 검색"
        memberIcon={false}
        filterIcon={false}
        sortIcon={false}
        width="100%"
      />
      <Spacing  size={5} />
      
      <MultiSelectBar
        selectedCards={selectedCards}
        allCards={cards}
        setSelectedCards={setSelectedCards}
      />
      <Spacing  size={5} />
      <Flex direction="column" justify="center" align="center">
        {cards.map(card => {
          return (
            <div css={cardContainer} onClick={() => onselect}>
              
              <CardThumbnail
                cardInfo={card}
                key={card.cardId}
                onSelect={handleCardSelect}
                selectedCards={selectedCards}
                scale={1}
                forShare={true}
              />
            </div>
          )
        })}
      </Flex>
      <div css={btnContainer}>
        <LargeButton
          text="공유하기"
          onClick={() => console.log('공유하기 버튼 클릭. 선택된 카드의 아이디 : ', selectedCards)}
        />
      </div>
    </div>
  )
}

export default ShareCard

const textCss = css`
padding-left: 5vw;
`

const cardContainer = css`
  width: 95%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  
`

const btnContainer = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: ${tokens.colorNeutralBackground1}; 
`

const arrowContainer = css`
  width: fit-content;
  margin-top: 2vh;
  padding-left: 5vw;
  
`