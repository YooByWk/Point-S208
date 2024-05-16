/** @jsxImportSource @emotion/react */
import { fetchCardByFilter, fetchMyAlbum } from '@/apis/album'
import CardList from '@/components/shared/CardList'
import { userState } from '@/stores/user'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Spinner } from '@fluentui/react-components'
import AddCard from '@/components/mobile/MyAlbum/AddCard'
import { filterState as filterStoreState } from '@/stores/album'
import { ExternalCardListType } from '@/types/ExternalCard'
import { isAlbumState } from '@/stores/emptyCard'

const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId
  const [searchValue, setSearchValue] = useState('')
  const [filterState, setFilterState] = useRecoilState(filterStoreState)
  const setIsAlbum = useSetRecoilState(isAlbumState)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchAlbum,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['fetchMyAlbum', userId, 0],
    queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return Array.isArray(lastPage.data_body) && lastPage.data_body.length > 0
        ? allPages.length
        : undefined
    },
    initialPageParam: 0,
  })

  const { data: filterData, refetch: refetchFilter } = useQuery({
    queryKey: ['fetchCardByFilter'],
    queryFn: () =>
      fetchCardByFilter(userId as number, filterState.filterId as number),
    enabled: false,
  })

  useEffect(() => {
    if (isNaN(filterState.filterId)) {
      refetchAlbum()
    } else {
      refetchFilter()
    }
  }, [filterState.filterId])

  let cards = isNaN(filterState.filterId)
    ? data?.pages.flatMap(page => page.data_body || []) || []
    : filterData?.data_body.cardList || []

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (hasNextPage) {
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
    setIsAlbum(true)
  }
  //

  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)

  const renderCards = () => {
    if (cards.length > 0 && cards[0] !== undefined) {
      return (
        <CardList
          cards={cards}
          isTeam={false}
          handleAdd={handleAdd}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )
    } else {
      return <CardList cards={[]} isTeam={false} handleAdd={handleAdd} />
    }
  }
  if (isLoading) {
    return <Spinner label="로딩 중..." style={{ height: '100vh' }} />
  }

  return (
    <>
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
            <Spinner label="불러오는 중..." appearance="inverted" />
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
