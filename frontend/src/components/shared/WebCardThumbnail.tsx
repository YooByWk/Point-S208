/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@shared/Flex'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'
import { Checkbox, Image } from '@fluentui/react-components'
import {
  Star24Regular,
  Star24Filled,
  ShareAndroid24Filled,
} from '@fluentui/react-icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedCardState } from '@stores/card'
import { userState } from '@/stores/user'
import { ExternalCardType } from '@/types/ExternalCard'
import WebMakeBusinessCard from '../web/WebAlbum/WebMakeBusinessCard'
import WebAlbumDeleteSingleCard from '../web/WebAlbum/WebAlbumDeleteSingleCard'
import { useMutation } from '@tanstack/react-query'
import { getAlbumDetail } from '@/apis/album'

interface CardThumbnailProps {
  cardInfo: ExternalCardType | CardType
  selectedCards: number[]
  setIsDetail: (isDetail: boolean) => void
  onSelect: (cardId: number) => void
}

const WebCardThumbnail = ({
  cardInfo,
  selectedCards,
  setIsDetail,
  onSelect,
}: CardThumbnailProps) => {
  const [isfavorite, setIsFavorite] = useState(false)
  const [isChecked, setIsChecked] = useState(
    selectedCards.includes(cardInfo.cardId),
  )

  const setSelectedCard = useSetRecoilState(selectedCardState)

  const userId = useRecoilValue(userState).userId

  useEffect(() => {
    const isChecked = selectedCards.includes(cardInfo.cardId)
    setIsChecked(isChecked)
  }, [selectedCards, cardInfo.cardId, setIsChecked])

  const { mutate } = useMutation({
    mutationKey: ['getAlbumDetail'],
    mutationFn: getAlbumDetail,
    onSuccess(result) {
      setSelectedCard(result.data_body)
    },
    onError(error) {
      console.error(error)
    },
  })

  const handleDetailSelect = () => {
    mutate({ userId: userId, cardId: cardInfo.cardId })
    setIsDetail(true)
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
    onSelect(cardInfo.cardId)
  }

  const handleFavorite = () => {
    setIsFavorite(!isfavorite)
    /*  api 호출 */
    console.log('즐겨찾기 : ', cardInfo)
  }

  const handleShare = () => {
    console.log('공유 : ', cardInfo)
  }

  return (
    <>
      <Flex justify="center" align="center" css={content}>
        <div onClick={handleDetailSelect} css={imgContainerStyles}>
          {cardInfo.realPicture ? (
            <Image
              fit="contain"
              src={cardInfo.realPicture}
              alt={`${cardInfo.name}'s card`}
            />
          ) : (
            <WebMakeBusinessCard cardInfo={cardInfo} />
          )}
        </div>

        <Flex direction="column" justify="space-around" align="center">
          <Checkbox
            shape="circular"
            label=""
            onClick={handleCheck}
            checked={isChecked}
            css={checkboxStyles}
          />

          <Spacing size={10} />
          {isfavorite ? (
            <Star24Filled css={iconCss} onClick={handleFavorite} />
          ) : (
            <Star24Regular css={i} onClick={handleFavorite} />
          )}
          <ShareAndroid24Filled css={i} onClick={handleShare} />
          <WebAlbumDeleteSingleCard cardInfo={cardInfo} />
          <Spacing size={10} />
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
`
