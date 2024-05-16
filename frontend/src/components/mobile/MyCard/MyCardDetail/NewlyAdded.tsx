/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import { Image } from '@fluentui/react-components'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedCardState } from '@/stores/card'
import { useMutation } from '@tanstack/react-query'
import { getAlbumDetail } from '@/apis/album'
import { userState } from '@/stores/user'
import WebMakeBusinessCard from '@/components/web/WebAlbum/WebMakeBusinessCard'

const NewlyAdded = ({
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
      <Flex align="center" css={bg}>
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
                width="40vw"
                height="20vw"
                typoLarge="t11"
                typoMedium="t11"
                typoSmall="t11"
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default NewlyAdded

// css

const bg = css``

const boxStyles = css`
  width: 40vw;
  height: 20vw;
  margin: 0 5px;
`
