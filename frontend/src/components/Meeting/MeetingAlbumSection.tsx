/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { fetchMyAlbum } from '@apis/album'
import { userState } from '@stores/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Spinner } from '@fluentui/react-components'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { isRefreshedAlbumState } from '@/stores/card'
import { CardType } from '@/types/cardType'
import { ExternalCardListType, ExternalCardType } from '@/types/ExternalCard'
import { isAddCardByInfoState } from '@/stores/album'
import MeetingCardThumbnail from './MeetingCardThumbnail'
import SearchBox from '@shared/SearchBox'
import { UserListType } from '@/types/userType'
import Spacing from '@shared/Spacing'

const MeetingAlbumSection = () => {
  const userId = useRecoilValue(userState).userId
  const isRefreshed = useRecoilValue(isRefreshedAlbumState)
  const isAddCardByInfo = useRecoilValue(isAddCardByInfoState)
  const [cards, setCards] = useState<CardType[]>([])
  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)
  const [searchValue, setSearchValue] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['fetchMyAlbum'],
      queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
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
    console.log(hasNextPage)
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

  const handleResult = (data: ExternalCardListType | UserListType) => {
    if (Array.isArray(data)) {
      setSearchResults(data as ExternalCardListType)
    }

    console.log('searchResult:', searchResults)
  }

  return (
    <Flex direction="column">
      <Flex direction="column" align="flex-start">
        <Text typography="t9">내 명함지갑</Text>
        <Spacing direction="vertical" size={10} />
        <SearchBox
          onChange={e => {
            if (e.target.value !== undefined) {
              setSearchValue(e.target.value)
            }
          }}
          onSearch={handleResult}
          value={searchValue}
          placeholder="명함 검색"
          memberIcon={false}
          filterIcon={false}
          sortIcon={false}
          width="70%"
          size="small"
        />
      </Flex>
      <div css={boxStyles}>
        {cards.length > 0 && cards[0] !== undefined ? (
          <>
            <div>
              {searchResults !== undefined &&
              searchValue !== undefined &&
              searchValue.trim() !== '' ? (
                searchResults.length > 0 ? (
                  searchResults.map(
                    (card: ExternalCardType | CardType, index: number) => {
                      return <MeetingCardThumbnail card={card} />
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
                    return <MeetingCardThumbnail card={card} />
                  })
              )}
            </div>
          </>
        ) : (
          <>
            <Flex
              direction="column"
              justify="center"
              align="center"
              css={nullDivCss}
            >
              <Text typography="t8">지갑에 등록된 명함이 없습니다.</Text>
            </Flex>
          </>
        )}

        {isFetchingNextPage && (
          <div css={SpinnerCss}>
            <Spinner />
          </div>
        )}
      </div>
    </Flex>
  )
}

export default MeetingAlbumSection

const SpinnerCss = css`
  padding-bottom: 50px;
`

const nullDivCss = css`
  height: calc(100% - 150px);
  padding-bottom: 10vh;
`

const boxStyles = css`
  padding-bottom: 50px;
`
