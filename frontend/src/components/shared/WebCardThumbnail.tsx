/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import { Checkbox } from '@fluentui/react-components'
import {
  Star24Regular,
  Star24Filled,
  ShareAndroid24Filled,
  Delete24Filled,
} from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
///
///
interface CardThumbnailProps {
  cardInfo: CardType
  onSelect: (cardId: number) => void
  selectedCards: number[]
  forShare?: boolean
  scale?: number
}

const WebCardThumbnail = ({
  cardInfo,
  onSelect,
  selectedCards,
  forShare = false,
  scale = 1,
}: CardThumbnailProps) => {
  const [isfavorite, setIsFavorite] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const isSelected = selectedCards.includes(cardInfo.cardId)

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
  const userId = useRecoilValue(userState).userId

  const navigate = useNavigate()
  return (
    <>
      <Flex direction="row" justify="center" align="center" css={content}>
        <div
          onClick={() => {
            if (forShare) {
              // 공유하기 화면 이하에서는 명함 썸네일 전체가 선택여부가 되도록
              setIsChecked(!isChecked)
              onSelect(cardInfo.cardId)
            } else {
              console.log(cardInfo, '님의 명함')
              navigate(`/myAlbum/${userId}/${cardInfo.cardId}`)
            }
          }}
          css={imgContainerStyles}
        >
          <img
            src={
              cardInfo.realPicture
                ? cardInfo.realPicture
                : cardInfo.digitalPicture
            }
            alt="card"
          />
        </div>
        {!forShare && (
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
        )}
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
