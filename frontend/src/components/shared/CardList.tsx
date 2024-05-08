/** @jsxImportSource @emotion/react */

import type { CardType } from '@/types/cardType'
import type { CardListType } from '@/types/CardListType'
import CardThumbnail from './CardThumbnail'
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
import { useRecoilState, useRecoilValue } from 'recoil'
import { pageChanged } from '@stores/team'
import { ExternalCardListType } from '@/types/ExternalCard'
import { ExternalCardType } from '@/types/ExternalCard'
import { UserListType, UserType } from '@/types/userType'
import { filterState } from '@/stores/album'

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
  const isfilter = useRecoilValue(filterState)
  console.log('isfilter: ', isfilter);
  const [searchValue, setSearchValue] = useState('')
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isShare, setIsShare] = useState(false) // 공유창 여닫는 state

  // 공유창에서 선택한 명함을 저장하는 state를 별도로? //

  const { teamAlbumId } = useParams() // 팀인 경우에만 사용하게 해야함 : 수정하기

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

  console.log('cards: ', cards)
  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)

  // const handleResult = (data: ExternalCardListType) => {
  //   if (data) {
  //     setSearchResults(data)
  //   }
  // }

  const handleResult = (data: ExternalCardListType | UserListType) => {
    if (data === undefined) {
      setSearchResults([])
      return
    }
    if (Array.isArray(data)) {
      setSearchResults(data as ExternalCardListType)
    }
  }

  return (
    <>
      {!isShare ? (
        <>
          <SearchBox
            value={searchValue}
            onChange={e => {
              if (e.target.value !== undefined) {
                setSearchValue(e.target.value)
              }
            }}
            onSearch={handleResult}
            placeholder={isTeam ? '팀 명함 검색' : '명함 검색'}
            memberIcon={isTeam ? true : false}
            spacing={false}
          />
          <Spacing size={15} />
          <MultiSelectBar
            selectedCards={selectedCards}
            allCards={cards}
            setSelectedCards={setSelectedCards}
          />
          <Flex direction="column" justify="center" align="center">
            {searchResults !== undefined &&
            searchValue !== undefined &&
            searchValue.trim() !== '' ? (
              searchResults.length > 0 ? (
                searchResults.map(
                  (card: ExternalCardType | CardType, index: number) => {
                    return (
                      <CardThumbnail
                        cardInfo={card}
                        key={index}
                        onSelect={handleCardSelect}
                        selectedCards={selectedCards}
                      />
                    )
                  },
                )
              ) : (
                <Flex direction="column" justify="center" align="center">
                  검색 결과가 없습니다
                </Flex>
              )
            ) :  cards.length > 0  ? (
              cards.map((card: ExternalCardType | CardType, index: number) => {
                return (
                  <CardThumbnail
                    cardInfo={card}
                    key={index}
                    onSelect={handleCardSelect}
                    selectedCards={selectedCards}
                  />
                )
              })
            ) : (
              isfilter.filterId ? 
              (<Flex direction="column" justify="center" align="center" style={{height:'50vh'}}>
                해당 필터에 명함이 없습니다
              </Flex>) : 
              (<Flex direction="column" justify="center" align="center" style={{height:'50vh'}}>
              명함지갑에 명함이 없습니다
            </Flex>)
            )}
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
