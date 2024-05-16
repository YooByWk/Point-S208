/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import { Checkbox, Image } from '@fluentui/react-components'
import { ShareAndroid24Filled, Delete24Filled } from '@fluentui/react-icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedCardState } from '@stores/card'
import { userState } from '@/stores/user'
import { ExternalCardType } from '@/types/ExternalCard'
import { useMutation } from '@tanstack/react-query'
import WebMakeBusinessCard from '../../WebAlbum/WebMakeBusinessCard'
import WebAlbumShare from '../../WebAlbum/WebAlbumShare'
import WebAlbumDeleteSingleCard from '../../WebAlbum/WebAlbumDeleteSingleCard'
import { fetchTeamCardDetail } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'

interface CardThumbnailProps {
  cardInfo: ExternalCardType | CardType
  selectedCards: number[]
  setIsDetail: (isDetail: boolean) => void
  onSelect: (cardId: number) => void
}

const WebTeamCardThumbnail = ({
  cardInfo,
  selectedCards,
  setIsDetail,
  onSelect,
}: CardThumbnailProps) => {
  // const [isfavorite, setIsFavorite] = useState(false)
  const [isChecked, setIsChecked] = useState(
    selectedCards.includes(cardInfo.cardId),
  )
  const setSelectedCard = useSetRecoilState(selectedCardState)
  const selectedTeam = useRecoilValue(selectedTeamAlbumIdState)

  const userId = useRecoilValue(userState).userId

  useEffect(() => {
    const isChecked = selectedCards.includes(cardInfo.cardId)
    setIsChecked(isChecked)
  }, [selectedCards, cardInfo.cardId, setIsChecked])

  const { mutate } = useMutation({
    mutationKey: ['fetchTeamCardDetail'],
    mutationFn: fetchTeamCardDetail,
    onSuccess(result) {
      setSelectedCard(result.data_body)
    },
    onError(error) {
      console.error(error)
    },
  })

  const handleDetailSelect = () => {
    mutate({ teamAlbumId: selectedTeam.teamAlbumId, cardId: cardInfo.cardId })
    setIsDetail(true)
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
    onSelect(cardInfo.cardId)
  }

  // const handleFavorite = () => {
  //   setIsFavorite(!isfavorite)
  //   /*  api 호출 */
  //   console.log('즐겨찾기 : ', cardInfo)
  // }

  return (
    <>
      <Flex justify="center" align="center">
        <div onClick={handleDetailSelect} css={imgContainerStyles}>
          {cardInfo.realPicture ? (
            <Image
              fit="contain"
              src={cardInfo.realPicture}
              alt={`${cardInfo.name}님의 명함`}
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
          {/* {isfavorite ? (
            <Star24Filled css={iconCss} onClick={handleFavorite} />
          ) : (
            <Star24Regular css={i} onClick={handleFavorite} />
          )} */}
          <WebAlbumShare card={cardInfo}>
            <ShareAndroid24Filled css={i} />
          </WebAlbumShare>
          <WebAlbumDeleteSingleCard
            cardInfo={cardInfo}
            setIsDetail={setIsDetail}
          >
            <Delete24Filled />
          </WebAlbumDeleteSingleCard>
          <Spacing size={10} />
        </Flex>
      </Flex>
    </>
  )
}

export default WebTeamCardThumbnail

// css

const i = css`
  margin-bottom: 15px;
`

const checkboxStyles = css`
  padding-left: 13px;
`

const imgContainerStyles = css`
  width: 263px;
  height: 150px;
  overflow-y: hidden;
`
