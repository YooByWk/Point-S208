/** @jsxImportSource @emotion/react */

import { fetchCardByFilter, fetchMyAlbum } from '@/apis/album'
import { dummyCardList } from '@/assets/data/dummyCardList'
import CardList from '@/components/shared/CardList'
import { userState } from '@/stores/user'
import { CardListType } from '@/types/CardListType'
import { CardType } from '@/types/cardType'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
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
import { filterState as filterStoreState } from '@/stores/album'
import { dummyCard } from '@/assets/data/dummyCard'
import { ExternalCardListType, ExternalCardType } from '@/types/ExternalCard'

const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId
  const [user, setUser] = useRecoilState(userState)
  const [searchValue, setSearchValue] = useState('')
  const [filterState, setFilterState] = useRecoilState(filterStoreState)

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, refetch: refetchAlbum } =
    useInfiniteQuery({
      queryKey: ['fetchMyAlbum'],
      queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage.data_body) &&
          lastPage.data_body.length > 0
          ? allPages.length + 1
          : undefined
      },
      initialPageParam: 0,
    })

  const {data : filterData, refetch: refetchFilter} = useQuery({
    queryKey: ['fetchCardByFilter'],
    queryFn: () => fetchCardByFilter(userId as number , filterState.filterId as number),
    enabled: false
  })
  
  useEffect(() => {
    if (isNaN(filterState.filterId)) {
      refetchAlbum();
    } else {
      refetchFilter();
    }
  }, [filterState.filterId]);
  
    
  let cards = isNaN(filterState.filterId)?  data?.pages.flatMap(page => page.data_body) || [] : filterData?.data_body.cardList || []
  console.log('cards: ', filterData? filterData : 'no')
  //

  useEffect(() => {
    const handleScroll = () => {
      console.log('scroll')
      console.log(
        window.innerHeight + window.scrollY >= document.body.offsetHeight,
        hasNextPage,
      )
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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

  
  const renderCards = () => {
    if (cards.length > 0 && cards[0] !== undefined) {
      return <CardList cards={cards} isTeam={false} handleAdd={handleAdd} />;
    } else {
      return (
        <CardList cards={[]} isTeam={false} handleAdd={handleAdd} />
      );
    }
  };
  
  
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
  {renderCards()}
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
