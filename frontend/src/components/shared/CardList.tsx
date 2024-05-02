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
import { useParams } from 'react-router-dom'
import { tokens } from '@fluentui/react-components'
import { useRecoilState } from 'recoil'
import { pageChanged } from '@stores/team'

interface CardListProps {
  cardList?: CardListType
  cards: CardType[]
  isTeam?: boolean
  parentisLoading?: boolean
  handleAdd?: () => void
}

const CardList = ({
  parentisLoading = false,
  cardList,
  cards,
  isTeam,
  handleAdd,
}: CardListProps) => {
  const [isPageChanged, setPageChanged] = useRecoilState(pageChanged)

  const [searchValue, setSearchValue] = useState('')
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isShare, setIsShare] = useState(false) // 공유창 여닫는 state

  // 공유창에서 선택한 명함을 저장하는 state를 별도로? //

  const { teamId } = useParams() // 팀인 경우에만 사용하게 해야함 : 수정하기

  // 내 명함 목록인 경우
  /* 
    1. 유저 아이디로 명함 가져오기 : 부모
    2. 부모가 자식에게 명함을 넘겨줌
    3. 자식이 명함을 받아서 명함을 보여줌
   */

  // 팀 명함 목록인 경우
  /* 
    1. 팀 아이디로 명함 가져오기 : 부모
    2. 부모가 자식에게 명함을 넘겨줌
    3. 자식이 명함을 받아서 명함을 보여줌
  */

  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId],
    )
  }

  const handleBtn = () => {
    setPageChanged(!isPageChanged)
    console.log('isPageChanged: ', isPageChanged)
  }

  const handleShare = () => {
    handleBtn()
    setIsShare(!isShare)
    console.log('isShare: ', isShare)
  }

  return (
    <>
      {!isShare ? (
        <>
          <SearchBox
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
            placeholder={isTeam ? '팀 명함 검색' : '명함 검색'}
            memberIcon={isTeam ? true : false}
            spacing={false}
          />
          <Spacing size={20} />
          <MultiSelectBar
            selectedCards={selectedCards}
            allCards={cards}
            setSelectedCards={setSelectedCards}
          />
          <Flex direction="column" justify="center" align="center">
            {cards
              .filter(card => card)
              .map(card => {
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
            {selectedCards.length > 0 ? (
              <LargeButton text="명함 공유" width="80%" onClick={handleShare} />
            ) : (
              <LargeButton text="명함 추가" width="80%" onClick={handleAdd} />
            )}
          </div>{' '}
        </>
      ) : (
        <>
          <ShareCard
            cards={cards}
            onSelect={handleCardSelect}
            selectedCards={selectedCards}
            handleCardSelect={handleCardSelect}
            setSelectedCards={setSelectedCards}
            setIsShare={setIsShare}
            isShare={isShare}
            setIsPageChanged={setPageChanged}
            isPageChanged={isPageChanged}
          />
        </>
      )}
    </>
  )
}

export default CardList

const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 0px;
  height: 45px;
  background-color: ${tokens.colorNeutralBackground1};
  /* display: flex; */
  /* align-items: center; */
`
