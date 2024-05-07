/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
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
import { fetchTeamCardsList } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'

const WebTeamDetailList = ({
  selectedCards,
  setIsDetail,
  setSelectedCards,
}: {
  selectedCards: number[]
  setIsDetail: (isDetail: boolean) => void
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const selectedTeam = useRecoilValue(selectedTeamAlbumIdState)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['fetchTeamCardsList'],
      queryFn: ({ pageParam = 0 }) =>
        fetchTeamCardsList(selectedTeam.teamAlbumId, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage) && lastPage.length > 0
          ? allPages.length
          : undefined
      },
      initialPageParam: 0,
    })

  const cards = data?.pages.flatMap(page => page.data_body) || []

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
  }, [fetchNextPage, hasNextPage, data])

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
                      key={card.cardId}
                      cardInfo={card}
                      selectedCards={selectedCards}
                      setIsDetail={setIsDetail}
                      onSelect={handleCardSelect}
                    />
                  )
                })}
            </div>
            <div css={buttonCss}>
              {selectedCards.length > 0 ? (
                <LargeButton text="명함 공유" width="80%" onClick={() => {}} />
              ) : (
                <LargeButton text="명함 추가" width="80%" onClick={handleAdd} />
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

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

const boxStyles = css`
  padding-top: 100px;
  padding-bottom: 50px;
`
