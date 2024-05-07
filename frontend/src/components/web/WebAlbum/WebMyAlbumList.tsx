/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { fetchMyAlbum } from '@apis/album'
import { userState } from '@stores/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Spinner, tokens } from '@fluentui/react-components'
import LargeButton from '@shared/LargeButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import AddCard from '@components/mobile/MyAlbum/AddCard'
import WebCardThumbnail from '@/components/shared/WebCardThumbnail'
import { isRefreshedAlbumState } from '@/stores/card'
import { CardType } from '@/types/cardType'

const WebMyAlbumList = ({
  cards,
  setCards,
  selectedCards,
  setSelectedCards,
  setIsDetail,
}: {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
  setIsDetail: (isDetail: boolean) => void
}) => {
  const userId = useRecoilValue(userState).userId
  const isRefreshed = useRecoilValue(isRefreshedAlbumState)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['fetchMyAlbum'],
      queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage) && lastPage.length > 0
          ? allPages.length
          : undefined
      },
      initialPageParam: 0,
    })

  useEffect(() => {
    if (data) {
      setCards(data.pages.flatMap(page => page) || [])
    }
  }, [data, setCards])

  useEffect(() => {
    refetch()
  }, [isRefreshed, refetch])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      )
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
    console.log('이미지로 명함 추가')
  }

  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId],
    )
  }

  return (
    <>
      <div css={boxStyles}>
        {cards.length > 0 && cards[0] !== undefined ? (
          <>
            <div css={gridStyles}>
              {cards
                .filter(card => card)
                .map(card => {
                  return (
                    <WebCardThumbnail
                      cardInfo={card}
                      key={card.cardId}
                      selectedCards={selectedCards}
                      setIsDetail={setIsDetail}
                      onSelect={handleCardSelect}
                    />
                  )
                })}
            </div>
            <div css={buttonCss}>
              <LargeButton text="명함 추가" width="80%" onClick={handleAdd} />
            </div>
          </>
        ) : (
          <Flex
            direction="column"
            justify="center"
            align="center"
            css={nullDivCss}
          >
            <Text>지갑에 등록된 명함이 없습니다.</Text>

            <Spacing size={40} direction="vertical" />
            <LargeButton
              text="명함 추가"
              width="80vw"
              height="50px"
              onClick={handleAdd}
            />
          </Flex>
        )}
        {isFetchingNextPage && (
          <div css={SpinnerCss}>
            <Spinner />
          </div>
        )}
      </div>
      {isAddCard && (
        <AddCard isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
      )}
    </>
  )
}

export default WebMyAlbumList

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
  /* display: flex; */
  /* align-items: center; */
`

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`
const boxStyles = css`
  padding-top: 100px;
  padding-bottom: 50px;
`
