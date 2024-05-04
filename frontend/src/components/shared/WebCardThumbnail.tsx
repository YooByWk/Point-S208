/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@shared/Flex'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'
import { Checkbox, Image } from '@fluentui/react-components'
import {
  Star24Regular,
  Star24Filled,
  ShareAndroid24Filled,
  Delete24Filled,
} from '@fluentui/react-icons'
import { useSetRecoilState } from 'recoil'
import { selectedCardState } from '@stores/card'

interface CardThumbnailProps {
  cardInfo: CardType
  selectedCards: number[]
  setIsDetail: (isDetail: boolean) => void
}

const WebCardThumbnail = ({
  cardInfo,
  selectedCards,
  setIsDetail,
}: CardThumbnailProps) => {
  const [isfavorite, setIsFavorite] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const isSelected = selectedCards.includes(cardInfo.cardId)
  const setSelectedCardState = useSetRecoilState(selectedCardState)

  const handleDetailSelect = () => {
    setIsDetail(true)
    setSelectedCardState(cardInfo)
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
    // onSelect(cardInfo.cardId)
  }

  const handleFavorite = () => {
    setIsFavorite(!isfavorite)
    /*  api 호출 */
    console.log('즐겨찾기 : ', cardInfo)
  }

  const handleShare = () => {
    console.log('공유 : ', cardInfo)
  }

  const handleDelete = () => {
    console.log('삭제 : ', cardInfo)
  }

  return (
    <>
      <Flex direction="row" justify="center" align="center" css={content}>
        <div onClick={handleDetailSelect} css={imgContainerStyles}>
          <Image fit="contain" src={cardInfo.realPicture} alt="card" />
        </div>

        <Flex direction="column" justify="space-around" align="center">
          <Spacing size={10} />
          <Checkbox
            shape="circular"
            label=""
            onClick={handleCheck}
            css={checkboxStyles}
          />
          <Spacing size={10} />
          {isfavorite ? (
            <Star24Filled css={iconCss} onClick={handleFavorite} />
          ) : (
            <Star24Regular css={i} onClick={handleFavorite} />
          )}
          <ShareAndroid24Filled css={i} onClick={handleShare} />
          <Delete24Filled css={i} onClick={handleDelete} />
        </Flex>
      </Flex>
    </>
  )
}

export default WebCardThumbnail

const iconCss = css`
  color: yellow;
  margin-bottom: 15px;
`
const i = css`
  margin-bottom: 15px;
`

const content = css``

const checkboxStyles = css`
  padding-left: 13px;
`

const imgContainerStyles = css`
  width: 263px;
  height: 150px;
  border: 1px solid black;
`
