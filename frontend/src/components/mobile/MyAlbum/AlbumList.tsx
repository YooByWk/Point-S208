/** @jsxImportSource @emotion/react */

import { fetchMyAlbum } from '@/apis/album'
import { dummyCardList } from '@/assets/data/dummyCardList'
import CardList from '@/components/shared/CardList'
import { userState } from '@/stores/user'
import { CardListType } from '@/types/CardListType'
import { CardType } from '@/types/cardType'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Spinner } from '@fluentui/react-components'
import { css } from '@emotion/react'
import LargeButton from '@/components/shared/LargeButton'
import Flex from '@/components/shared/Flex'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import AddCard from '@/components/mobile/MyAlbum/AddCard'
import SearchBox from '@/components/shared/SearchBox'

import { dummyCard } from '@/assets/data/dummyCard'
import { ExternalCardListType, ExternalCardType } from '@/types/ExternalCard'

const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId
  const [user, setUser] = useRecoilState(userState)
  const [searchValue, setSearchValue] = useState('')
  const [filterId, setFilterId] = useState(NaN)
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['fetchMyAlbum'],
      queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage.data_body) && lastPage.data_body.length > 0
          ? allPages.length + 1
          : undefined
      },
      initialPageParam: 0,
    })

  let cards = data?.pages.flatMap(page => page.data_body) || [] // 명함 리스트
  console.log('cards: ', cards);
  //
  
  useEffect(() => {
    const handleScroll = () => {
      console.log('scroll')
      console.log(window.innerHeight + window.scrollY >= document.body.offsetHeight, hasNextPage)
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
          {
          if (hasNextPage) {
            console.log('더불러오기')
            fetchNextPage()
          }
        }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, data])
  //
  const [isAddCard, setIsAddCard] = useState(false)
  const handleAdd = () => {
    setIsAddCard(!isAddCard)
  }
  //

  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)

  return (
    <>
      <button
        onClick={() =>
          setUser({
            name: '유 병욱',
            email: 'tls1919@ssafys208.onmicrosoft.com',
            userId: 3,
          })
        }
      >
        로컬 전용 아이디 하드코딩 : 수정하기
      </button>
      {(searchValue.trim() !== '' &&
        searchResults !== undefined &&
        searchResults.length > 0 &&
        searchResults[0] !== undefined) ||
      searchValue.length > 0 ? (
        searchResults?.map(res => <p>{res.name}</p>)
      ) : (
        <div>
          {cards.length > 0 && cards[0] !== undefined ? (
            <CardList
              cards={cards}
              isTeam={false}
              handleAdd={handleAdd}
            />
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              css={nullDivCss}
            >
              <Text>지갑에 등록된 명함이 없습니다.</Text>
              <button onClick={() => console.log(userId)}>아이디 확인 </button>
              <Spacing size={40} direction="vertical" />
              <LargeButton
                text="명함 추가"
                width="80vw"
                height="100px"
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
      )}
      {isAddCard && (
        <AddCard isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
      )}
    </>
  )
}

export default AlbumList

const SpinnerCss = css`
  padding-bottom: 50px;
  /* position: fixed; */
  /* bottom: 50vh; */
`

const nullDivCss = css`
  height: 100%;
  padding-bottom: 10vh;
`
