/** @jsxImportSource @emotion/react */

import type { CardType } from '@/types/cardType'
import  Flex  from '@/components/shared/Flex';
import Text  from '@/components/shared/Text';
import { css } from '@emotion/react';
import { tokens } from '@fluentui/react-components';

interface CardThumbnailProps {
  cardInfo: CardType
}

const CardThumbnail = ({cardInfo} : CardThumbnailProps) => {
  
  return (
    <div css={cardContainer} onClick={()=>{console.log(cardInfo.name,'님의 명함')}}>
      <p>icon</p>
      <Flex direction='row' justify='space-around' align='center'>
      <Flex direction='column' justify='center' align='center'>
          <Text typography='t7' bold={true}>{cardInfo.name}</Text>
          <Text typography='t9'>{`${cardInfo.rank} / ${cardInfo.position}`}</Text>
          <Text typography='t10'>{cardInfo.company}</Text>
        </Flex>
        <img src={cardInfo.realPicture? cardInfo.realPicture : cardInfo.digitalPicture} alt="card" />
        <Flex direction='column' justify='center' align='center'>
            <p>버튼</p>
            <p>버튼</p>
            <p>버튼</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default CardThumbnail;

const cardContainer = css`
  border-radius: 10px;
  width: 90%;
  min-height: 120px;
  margin-bottom: 3%;
  margin-top: 1%;
  background-color: ${tokens.colorNeutralBackground1Selected};
  padding: 10px;
`

const iconCss = css`
  position: fixed;
  top:0px;
` 