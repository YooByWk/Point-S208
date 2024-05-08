/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ShareAndroid16Filled } from '@fluentui/react-icons'
import { Button } from '@fluentui/react-components'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { Image } from '@fluentui/react-components'
import WebMakeBusinessCard from '../../WebAlbum/WebMakeBusinessCard'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedCardState } from '@/stores/card'
import { useMutation } from '@tanstack/react-query'
import { getAlbumDetail } from '@/apis/album'
import { userState } from '@/stores/user'

const WebNewlyAdded = ({
  card,
  setIsDetail,
}: {
  card: ExternalCardType | CardType
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const setSelectedCard = useSetRecoilState(selectedCardState)
  const userId = useRecoilValue(userState).userId

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

  const handleOnClick = () => {
    mutate({ userId: userId, cardId: card.cardId })
    setIsDetail(true)
  }

  return (
    <>
      <Flex css={boxBorderStyles} align="center">
        <Flex align="center" onClick={handleOnClick}>
          {/* 사진 */}
          <Flex css={boxStyles} align="center">
            {card.realPicture ? (
              <Image
                fit="contain"
                src={card.realPicture}
                alt={`${card.name}'s card`}
              />
            ) : (
              <WebMakeBusinessCard
                cardInfo={card}
                width="10vw"
                height="6vw"
                typoLarge="t11"
                typoMedium="t11"
                typoSmall="t11"
              />
            )}
          </Flex>
          {/* 정보 */}
          <Flex direction="column" justify="center" css={boxBorderStyles2}>
            <Text typography="t7">{card.company}</Text>
            <Text typography="t7">{card.name}</Text>
            <Text typography="t7">{card.phoneNumber}</Text>
            <Text typography="t7">{card.email}</Text>
          </Flex>
        </Flex>
        {/* 공유버튼 */}
        <Button appearance="transparent">
          <ShareAndroid16Filled /> 공유
        </Button>
      </Flex>
    </>
  )
}

export default WebNewlyAdded

const boxStyles = css`
  width: 10vw;
  height: 5vw;
  margin: 10px;
`

const boxBorderStyles = css`
  border-bottom: 1px solid ${colors.themeGray};
`

const boxBorderStyles2 = css`
  width: 25vw;
  border-left: 1px solid ${colors.themeGray};
  padding: 10px 0 10px 10px;
`
