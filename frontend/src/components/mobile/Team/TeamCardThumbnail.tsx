/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
// import MyDigitalCard from './../MyCard/MyDigitalCard'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'
import type { CardType } from '@/types/cardType'
// import { dummyCard } from '@/assets/data/dummyCard'

interface TeamCardThumbnailProps {
  cardInfo: CardType
}

const TeamCardThumbnail: React.FC<TeamCardThumbnailProps>= ({cardInfo}) => {
  /* 내 명함 정보*/
  return (
      <div css={TeamCardThumbnailContainer}>
        <div css={cardStyle(0)}>
          <MyDigitalCard cardInfo={cardInfo} scale={0.5} border={true}/>
        </div>
        <div css={cardStyle(18)}>
          <MyDigitalCard cardInfo={cardInfo} scale={0.5} border={true} />
        </div>
        <div css={cardStyle(36)}>
          <MyDigitalCard cardInfo={cardInfo} scale={0.5} border={true} />
        </div>
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