/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
// import MyDigitalCard from './../MyCard/MyDigitalCard'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'
import type { CardType } from '@/types/cardType'
import { useQuery } from '@tanstack/react-query';
import { fetchTeamCardsList } from '@/apis/team';
import { Key } from 'react';
// import { dummyCard } from '@/assets/data/dummyCard'

interface TeamCardThumbnailProps {
  teamAlbumId: number;
}

const TeamCardThumbnail: any= ({teamAlbumId}: {teamAlbumId: any}) => {
  /* 팀 명함 정보*/
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchTeamCardsList', null],
    queryFn: () => fetchTeamCardsList(teamAlbumId, 0),
  })
  // !isLoading && console.log(teamAlbumId, data.data_body)
  
  return (
    <div css={TeamCardThumbnailContainer}>
      {!isLoading && data ? data.data_body.slice(0, 3).map((card: CardType, index: number) => (
        <div key={index} css={cardStyle(index * 18)}>
          <MyDigitalCard cardInfo={card} scale={0.5} border={true}/>
        </div>
      )) : <div css={emptyCardStyle} />}
    </div>
  );
};

export default TeamCardThumbnail;
const TeamCardThumbnailContainer = css`
  /* 세개의 카드가 겹친 모양 */ 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin:auto; */
  /* background-color: red; */
  width: 60%;
  height: 100%;
  min-height: 120px;
  margin-top: 5px;
`
const cardStyle = (offset: number) => css`
  position: absolute;
  left: ${offset - 70}px;
  top: -${offset}px;
  
  /* transform: translate(${offset}px, -${offset}px); */
  z-index: ${36 - offset};
`;

const emptyCardStyle = css`
  width: 245px;
  height: 135px;
`