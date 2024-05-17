/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Spinner, tokens } from '@fluentui/react-components'
import LargeButton from '@shared/LargeButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { fetchTeamCardsList } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'
import useWindowSize from '@/hooks/useWindowSize'
import { CardType } from '@/types/cardType'
import { ExternalCardListType, ExternalCardType } from '@/types/ExternalCard'
import { isRefreshedAlbumState } from '@/stores/card'
import { isAddCardByInfoState } from '@/stores/album'
import WebAddCard from '../../WebAlbum/WebAddCard'
import WebTeamCardThumbnail from './WebTeamCardThumbnail'

const WebTeamDetailList = ({
  cards,
  setCards,
  selectedCards,
  setSelectedCards,
  setIsDetail,
  searchResults,
  searchValue,
}: {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
  setIsDetail: (isDetail: boolean) => void
  searchResults: ExternalCardListType | undefined
  searchValue: string
}) => {
  const selectedTeam = useRecoilValue(selectedTeamAlbumIdState)
  const isRefreshed = useRecoilValue(isRefreshedAlbumState)
  const isAddCardByInfo = useRecoilValue(isAddCardByInfoState)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['fetchTeamCardsList'],
      queryFn: ({ pageParam = 0 }) =>
        fetchTeamCardsList(selectedTeam.teamAlbumId, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage.data_body) &&
          lastPage.data_body.length > 0
          ? allPages.length
          : undefined
      },
      initialPageParam: 0,
    })

  useEffect(() => {
    if (data && data.pages) {
      setCards(data.pages.flatMap(page => page.data_body) || [])
    }
  }, [data, setCards])

  useEffect(() => {
    if (cards.length === 1 && cards[0].cardId === 0) {
      refetch()
    }
    refetch()
  }, [isRefreshed, refetch, cards, isAddCardByInfo])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
        return
      if (hasNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, data, isRefreshed])

  const [isAddCard, setIsAddCard] = useState(false)

  const handleAdd = () => {
    setIsAddCard(!isAddCard)
  }

  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId],
    )
  }

  const width = useWindowSize() - 320 - 17

  const marginInline = useMemo(() => {
    let baseMargin = width % 340
    if (cards.length * 340 < width) {
      baseMargin = width - cards.length * 340
    }
    return baseMargin / 2
  }, [width, cards.length])

  return (
    <>
      <div css={boxStyles}>
        {cards.length > 0 && cards[0] !== undefined ? (
          <>
            <div css={flexStyles(marginInline)}>
              {searchResults !== undefined &&
              searchValue !== undefined &&
              searchValue.trim() !== '' ? (
                searchResults.length > 0 ? (
                  searchResults.map(
                    (card: ExternalCardType | CardType, index: number) => {
                      return (
                        <WebTeamCardThumbnail
                          cardInfo={card}
                          key={index}
                          onSelect={handleCardSelect}
                          setIsDetail={setIsDetail}
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
              ) : (
                cards
                  .filter(card => card)
                  .map(card => {
                    return (
                      <WebTeamCardThumbnail
                        cardInfo={card}
                        key={card.cardId}
                        selectedCards={selectedCards}
                        setIsDetail={setIsDetail}
                        onSelect={handleCardSelect}
                      />
                    )
                  })
              )}
            </div>
          </>
        ) : (
          <Flex
            direction="column"
            justify="center"
            align="center"
            css={nullDivCss}
          >
            <Text>{selectedTeam.teamName}에 등록된 명함이 없습니다.</Text>
          </Flex>
        )}
        <div css={buttonCss}>
          <LargeButton text="명함 추가" width="80%" onClick={handleAdd} />
        </div>
        {isFetchingNextPage && (
          <div css={SpinnerCss}>
            <Spinner />
          </div>
        )}
      </div>
      {isAddCard && (
        <WebAddCard isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
      )}
    </>
  )
}

export default WebTeamDetailList

const SpinnerCss = css`
  padding-bottom: 50px;
`

const nullDivCss = css`
  height: 100%;
  padding-bottom: 10vh;
`

const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 0px;
  height: 45px;
  background-color: ${tokens.colorNeutralBackground1};
`

const flexStyles = (marginInline: number) => css`
  display: flex;
  flex-wrap: wrap;
  margin: 20px ${marginInline}px;
  gap: 20px;
`

const boxStyles = css`
  padding-top: 100px;
  padding-bottom: 50px;
`
