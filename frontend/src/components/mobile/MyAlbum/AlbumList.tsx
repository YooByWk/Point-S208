/** @jsxImportSource @emotion/react */

import { fetchMyAlbum } from '@/apis/album'
import { dummyCardList } from '@/assets/data/dummyCardList';
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

// import { useData, useTeamsUserCredential } from '@microsoft/teamsfx-react'
import { dummyCard } from '@/assets/data/dummyCard';

const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['fetchMyAlbum'],
      queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage) && lastPage.length > 0
          ? allPages.length
          : undefined
      },
      // getNextPageParam: (lastPage, allPages) =>
      // {
      //   return lastPage.length > 0 ? allPages.length  : undefined},
      initialPageParam: 0,
    })

  const cards = data?.pages.flatMap(page => page) || []

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
  
const [testValue, setTestValue] = useState(0)

const [result, setResult] = useState()
const handleResult = (data: any) => {
  
}
const dummyList: CardListType = dummyCardList
  return (
    <>
      {/*  */}
      <SearchBox
        value={testValue}
        onChange={(e) => setTestValue(e.target.value)}
      />
      <div>
        {cards.length > 0 && cards[0] !== undefined ? (
          <CardList
            // cardList={cardList}
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
