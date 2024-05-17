/** @jsxImportSource @emotion/react */
import type { CardType } from '@/types/cardType'
import CardThumbnail from './CardThumbnail'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import MultiSelectBar from '@/components/shared/MultiSelectBar'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import LargeButton from './LargeButton'
import ShareCard from '@/components/mobile/Team/ShareCard'
import { Spinner, tokens } from '@fluentui/react-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { pageChanged } from '@stores/team'
import { ExternalCardListType } from '@/types/ExternalCard'
import { ExternalCardType } from '@/types/ExternalCard'
import { UserListType } from '@/types/userType'
import { filterState } from '@/stores/album'
import { useQuery } from '@tanstack/react-query'
import { fetchAllAlbum } from '@/apis/album'
import { userState } from '@/stores/user'
import { useSaveToMyAlbum } from '@/hooks/useSaveToMyAlbum'

interface CardListProps {
  cards: CardType[]
  isTeam?: boolean
  parentisLoading?: boolean
  handleAdd?: () => void
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

const CardList = ({
  parentisLoading = false,
  cards,
  isTeam = false,
  handleAdd,
  isFetchingNextPage,
  hasNextPage,
}: CardListProps) => {
  const [isPageChanged, setPageChanged] = useRecoilState(pageChanged)
  const isfilter = useRecoilValue(filterState)
  const [searchValue, setSearchValue] = useState('')
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isShare, setIsShare] = useState(false) // 공유창 여닫는 state
  const saveToMyAlbumMutation = useSaveToMyAlbum()
  const userId = useRecoilValue(userState).userId

  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId],
    )
  }

  const handleBtn = () => {
    setPageChanged(!isPageChanged)
  }

  const handleShare = () => {
    handleBtn()
    setIsShare(!isShare)
  }

  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)

  const handleResult = (data: ExternalCardListType | UserListType) => {
    if (data === undefined) {
      setSearchResults([])
      return
    }
    if (Array.isArray(data)) {
      setSearchResults(data as ExternalCardListType)
    }
  }

  // 명함지갑 내 명함 총 개수 조회
  const { data } = useQuery({
    queryKey: ['fetchMyCard'],
    queryFn: () => fetchAllAlbum({ userId }),
  })

  // 내 명함지갑에 명함 내려받기
  const handleAddToMyCard = async () => {
    const tmp = await fetchAllAlbum({ userId })
    const myList = tmp.data_body.map((card: CardType) => card.cardId)
    const filteredCards = selectedCards.filter(card => !myList.includes(card))
    if (userId !== undefined) {
      saveToMyAlbumMutation.mutate({ userId, cardIds: filteredCards })
    }
    alert('내 명함지갑에 추가되었습니다.')
    setSelectedCards([])
  }

  return (
    <>
      {!isShare ? (
        <>
          <SearchBox
            value={searchValue}
            isTeam={isTeam}
            onChange={e => {
              if (e.target.value !== undefined) {
                setSearchValue(e.target.value)
              }
            }}
            onSearch={handleResult}
            placeholder={isTeam ? '팀 명함 검색' : '명함 검색'}
            memberIcon={isTeam ? true : false}
            spacing={false}
            filterIcon={false}
            sortIcon={false}
          />
          <Spacing size={15} />
          <MultiSelectBar
            selectedCards={selectedCards}
            allCards={cards}
            setSelectedCards={setSelectedCards}
            cardCnt={isTeam ? cards.length : data ? data.data_body.length : 0}
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
                        index={index}
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
            ) : cards.length > 0 ? (
              <>
                {cards.map(
                  (card: ExternalCardType | CardType, index: number) => {
                    return (
                      <CardThumbnail
                        cardInfo={card}
                        index={index}
                        key={index}
                        onSelect={handleCardSelect}
                        selectedCards={selectedCards}
                      />
                    )
                  },
                )}
                {isFetchingNextPage && hasNextPage && <Spinner />}
              </>
            ) : isfilter.filterId ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                style={{ height: '50vh' }}
              >
                해당 필터에 명함이 없습니다
              </Flex>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                style={{ height: '50vh' }}
              >
                명함지갑에 명함이 없습니다
              </Flex>
            )}
            <Spacing size={40} direction="vertical" />
          </Flex>
          <div css={buttonCss}>
            {selectedCards.length > 0 ? (
              isTeam ? (
                <LargeButton
                  text="내 명함지갑에 추가"
                  width="80%"
                  onClick={handleAddToMyCard}
                />
              ) : (
                <LargeButton
                  text="명함 공유"
                  width="80%"
                  onClick={handleShare}
                />
              )
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
  bottom: 0;
  padding-block: 10px;
  background-color: ${tokens.colorNeutralBackground1};
`
