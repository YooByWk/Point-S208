import { fetchMyAlbum } from '@/apis/album';
import { dummyCardList } from '@/assets/data/dummyCardList';
import CardList from '@/components/shared/CardList';
import { userState } from '@/stores/user';
import { CardListType } from '@/types/CardListType';
import { CardType } from '@/types/cardType';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const AlbumList = () => {
  // 내 명함 리스트
  const userId = useRecoilValue(userState).userId
  
  const [apiCardsList, setApiCardsList] = useState([{CardType: ''}]);

  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery({
    queryKey: ['fetchMyAlbum'],
    queryFn: ({ pageParam = 0 }) => fetchMyAlbum(userId as number, pageParam),
    getNextPageParam: (lastPage) => lastPage.length > 0 ? lastPage.length : false,
    // getNextPageParam: (lastPage) => lastPage.data.length >= 10 ? lastPage.data.length : false,
    initialPageParam: 0, 
  });
  
  // const cardList: CardListType = dummyCardList
  // const cards: CardType[] = cardList[0].cards 

  const cards = data?.pages.flatMap(page => page) || []
  
  useEffect(()=> {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) return
      
      if (hasNextPage){fetchNextPage()
        console.log('fetchNextPage')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[fetchNextPage, hasNextPage])
  
  
  return (
    <div>
      <button onClick={()=> console.log('API 호출', hasNextPage)}>adsfasdfasdfasdf</button>
      <CardList 
        // cardList={cardList} 
        cards={cards} 
        isTeam={false}
      />
    </div>
  );
};

export default AlbumList;