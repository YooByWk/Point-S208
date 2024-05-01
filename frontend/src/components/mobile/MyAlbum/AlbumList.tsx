/** @jsxImportSource @emotion/react */

import { fetchMyAlbum } from '@/apis/album';
// import { dummyCardList } from '@/assets/data/dummyCardList';
import CardList from '@/components/shared/CardList';
import { userState } from '@/stores/user';
import { CardListType } from '@/types/CardListType';
import { CardType } from '@/types/cardType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Spinner } from '@fluentui/react-components';
import { css } from '@emotion/react';
import LargeButton from '@/components/shared/LargeButton';
import Flex from '@/components/shared/Flex';
import  Text  from '@shared/Text';
import Spacing from '@/components/shared/Spacing';


const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId
  
  // const [apiCardsList, setApiCardsList] = useState([{CardType: ''}]);

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['fetchMyAlbum'],
    queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
    // getNextPageParam: (lastPage,) => lastPage.length > 0 ? lastPage.length : false,
    getNextPageParam: (lastPage, allPages) => 
    {
      return lastPage.length > 0 ? allPages.length  : undefined},
    // getNextPageParam: (lastPage) => lastPage.data.length >= 10 ? lastPage.data.length : false,
    initialPageParam: 0, 
  });
  
  // const cardList: CardListType = dummyCardList
  // const cards: CardType[] = cardList[0].cards 

  const cards = data?.pages.flatMap(page => page) || []

  
  useEffect(()=> {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) return

      if (hasNextPage){fetchNextPage()
        // console.log('fetchNextPage', hasNextPage)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[fetchNextPage, hasNextPage, data])
  
  
  return (
    <div>
      {cards.length > 0 ?<CardList 
        // cardList={cardList} 
        cards={cards} 
        isTeam={false}
      />:
      <Flex direction='column' justify='center' align='center' css={nullDivCss}>
        <Text>지갑에 등록된 명함이 없습니다.</Text>
        <button onClick={()=> console.log(userId)}>아이디 확인 </button>
        <Spacing size={40} direction='vertical'/>
        <LargeButton
          text='명함 추가'
          width='80vw'
          height='100px'
        />
      </Flex>
      }
      {isFetchingNextPage &&  <div css={SpinnerCss}><Spinner  /></div>}
    </div>
  );
};

export default AlbumList;

const SpinnerCss = css`
  padding-bottom: 50px;
  /* position: fixed; */
  /* bottom: 50vh; */
`;

const nullDivCss = css`
  height:100%;
  padding-bottom: 10vh;

`