/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@shared/Flex'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Image,
} from '@fluentui/react-components'
import {
  Star24Regular,
  Star24Filled,
  ShareAndroid24Filled,
  Delete24Filled,
} from '@fluentui/react-icons'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isRefreshedAlbumState, selectedCardState } from '@stores/card'
import { colors } from '@/styles/colorPalette'
import { useMutation } from '@tanstack/react-query'
import { deleteMyAlbumCard } from '@/apis/album'
import { userState } from '@/stores/user'
import { ExternalCardType } from '@/types/ExternalCard'
import WebMakeBusinessCard from '../web/WebAlbum/WebMakeBusinessCard'

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

  const setSelectedCardState = useSetRecoilState(selectedCardState)
  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAlbumState)
  const userId = useRecoilValue(userState).userId

  useEffect(() => {
    const isChecked = selectedCards.includes(cardInfo.cardId)
    setIsChecked(isChecked)
  }, [selectedCards, cardInfo.cardId, setIsChecked])

  const { mutate } = useMutation({
    mutationKey: ['deleteMyAlbumCard'],
    mutationFn: deleteMyAlbumCard,
    onSuccess(result) {
      console.log('삭제 성공', result)
      setIsRefreshed(!isRefreshed)
    },
    onError(error) {
      console.error('삭제 실패:', error)
    },
  })

  const handleDetailSelect = () => {
    console.log(cardInfo)
    setIsDetail(true)
    setSelectedCardState(cardInfo)
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

  const handleDelete = () => {
    mutate({ userId: userId, cardId: cardInfo.cardId })
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
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Delete24Filled />
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>명함을 삭제하시겠습니까?</DialogTitle>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      shape="circular"
                      css={buttonStyles}
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button shape="circular" css={buttonStyles2}>
                      취소
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
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

const buttonStyles = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
