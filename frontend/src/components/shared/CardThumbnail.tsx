/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import { tokens } from '@fluentui/react-components'
import {
  CheckmarkCircle24Regular,
  Circle24Regular,
  Star24Regular,
  Star24Filled,
  ShareAndroid24Filled,
  Delete24Filled,
} from '@fluentui/react-icons'
///
///
interface CardThumbnailProps {
  cardInfo: CardType
  onSelect: (cardId: number) => void
  selectedCards: number[]
  forShare?: boolean
  scale?: number
}

const CardThumbnail = ({
  cardInfo,
  onSelect,
  selectedCards,
  forShare = false,
  scale=1
}: CardThumbnailProps) => {
  const [isfavorite, setIsFavorite] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const isSelected = selectedCards.includes(cardInfo.cardId)

  const handleCheck = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsChecked(!isChecked)
    onSelect(cardInfo.cardId)
  }

  const handleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation()

    setIsFavorite(!isfavorite)
    /*  api 호출 */
    console.log('즐겨찾기 : ', cardInfo)
  }

  const handleShare = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('공유 : ', cardInfo)
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('삭제 : ', cardInfo)
  }

  return (
    <div
      css={cardContainer( forShare, scale)}
      onClick={() => {
        if (forShare) {
          setIsChecked(!isChecked)
          onSelect(cardInfo.cardId)
        } else {
          console.log(cardInfo.name, '님의 명함')
        }
      }}
    >
      {isSelected ? (
        <CheckmarkCircle24Regular onClick={handleCheck} />
      ) : (
        <Circle24Regular onClick={handleCheck} />
      )}
      {/* <CheckmarkCircle24Regular /> */}
      {/* <Circle24Regular /> */}
      <Flex direction="row" justify="space-around" align="center" css={content}>
        <Flex direction="column" justify="center" align="center">
          <Text typography="t7" bold={true}>
            {cardInfo.name}
          </Text>
          <Text typography="t9">{`${cardInfo.rank} / ${cardInfo.position}`}</Text>
          <Text typography="t10">{cardInfo.company}</Text>
        </Flex>
        <img
          src={
            cardInfo.realPicture
              ? cardInfo.realPicture
              : cardInfo.digitalPicture
          }
          alt="card"
        />
        {!forShare&&<Flex direction="column" justify="space-around" align="center">
          {isfavorite ? (
            <Star24Filled css={iconCss} onClick={handleFavorite} />
          ) : (
            <Star24Regular css={i} onClick={handleFavorite} />
          )}
          <ShareAndroid24Filled css={i} onClick={handleShare} />
          <Delete24Filled css={i} onClick={handleDelete} />
        </Flex>}
        
      </Flex>
      <Spacing  size={10} direction='vertical'/>
    </div>
  )
}

export default CardThumbnail

const cardContainer = (forShare:boolean, scale:number) => css`
  border-radius: 10px;
  width: 90%;
  min-height: 120px;
  margin-bottom: 3%;
  margin-top: 1%;
  background-color: ${tokens.colorNeutralBackground1Selected};
  min-height: 100px;
  scale: ${forShare? scale : 1};
  /* padding: 10px; */

  &:hover,
  &:active,
  &.wave {
    animation: wave 1.2s ease forwards;
    background: linear-gradient(
      90deg,
      ${tokens.colorNeutralBackground1Selected} 0%,
      ${tokens.colorNeutralBackground4Hover} 100%
    );
    background-size: 200% 200%;
  }
  @keyframes wave {
    0% {
      background-position: 10% 50%;
    }
    100% {
      background-position: 80% 50%;
      background: ${tokens.colorNeutralBackground1Selected};
    }
  }
`

const iconCss = css`
  color: yellow;
  margin-bottom: 15px;
`
const i = css`
  margin-bottom: 15px;
`

const content = css``
