/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import type { CardType } from '@/types/cardType'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { toJpeg } from 'html-to-image'
import { useMutation } from '@tanstack/react-query'
import { saveMyDigitalCard } from '@/apis/card'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { backCardState, frontCardState } from '@/stores/card'

interface MyDigitalCardProps {
  cardInfo: CardType
  scale?: number
  border?: boolean
}

interface MainContainerProps {
  scale?: number
  border?: boolean
}

function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) {
    throw new Error('Invalid data URL format')
  }
  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const MyDigitalCard: React.FC<MyDigitalCardProps> = ({
  cardInfo,
  scale,
  border,
}) => {
  if (!scale) {
    scale = 1.1
  }
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const userId = useRecoilValue(userState).userId
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const src: string = 'logo.png'

  const { mutate } = useMutation({
    mutationKey: ['saveMyDigitalCard'],
    mutationFn: saveMyDigitalCard,
    onSuccess(result) {},
    onError(error) {
      console.error('저장 실패:', error)
    },
  })

  useEffect(() => {
    const handleSaveAsJpg = () => {
      if (containerRef.current) {
        toJpeg(containerRef.current)
          .then(function (dataUrl) {
            const blob = dataURLtoBlob(dataUrl)
            const file = new File([blob], 'my_component.jpg', {
              type: 'image/jpeg',
            })

            const formData = new FormData()
            formData.append('file', file)
            mutate({ userId: userId, cardId: cardInfo.cardId, file: formData })
          })
          .catch(function (error) {
            console.error('이미지 생성 오류:', error.message)
          })
      }
    }

    if (loaded)
      if (cardInfo) {
        if (
          frontCard.cardId === cardInfo.cardId ||
          backCard.cardId === cardInfo.cardId
        )
          if (
            cardInfo.digitalPicture === null ||
            cardInfo.digitalPicture === undefined ||
            cardInfo.digitalPicture.trim() === ''
          )
            handleSaveAsJpg()
      }
  })

  useEffect(() => {
    const image = new Image()
    image.src = src

    image.onload = () => {
      setLoaded(true)
    }

    return () => {
      // Clean up by removing event listener
      image.onload = null
    }
  }, [src])

  return loaded ? (
    <Flex
      direction="column"
      justify="space-between"
      css={MainContainer({ scale, border })}
      ref={containerRef}
    >
      <Flex justify="flex-end" css={ImageBox}>
        <img src="logo.png" alt="포스코인터내셔널" />
      </Flex>

      <Flex justify="space-between">
        <LeftFlex>
          <Name>{cardInfo?.name}</Name>
          <Desc>{cardInfo?.department}</Desc>
          <Desc>{cardInfo?.position}</Desc>
        </LeftFlex>

        <RightFlex>
          <Company>
            {cardInfo?.frontBack === 'FRONT'
              ? '포스코인터내셔널'
              : 'POSCO INTERNATIONAL'}
          </Company>
          <Desc>Tel {cardInfo?.landlineNumber}</Desc>
          <Desc>Mobile {cardInfo?.phoneNumber}</Desc>
          <Desc>E-mail {cardInfo?.email}</Desc>
        </RightFlex>
      </Flex>
    </Flex>
  ) : (
    <div css={MainContainer({ scale, border })}></div>
  )
}

export default MyDigitalCard

// style

const LeftFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
`

const RightFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const Name = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  color: #000;
`

const Company = styled.p`
  font-size: 10px;
  font-weight: bold;
  line-height: 14px;
  white-space: nowrap;
  color: #000;
`

const Desc = styled.p`
  font-size: 8px;
  line-height: 10px;
  color: #000;
`

// css

const MainContainer = (props: MainContainerProps) => css`
  background-color: ${colors.white};
  width: 245px;
  height: 135px;
  border-radius: 10px;
  border: ${props.border ? '1px solid ' + colors.black : 'none'};
  padding: 20px 10px 20px 15px;
  transform: scale(${props.scale});
  overflow-y: hidden;
  overflow-x: auto;
`

const ImageBox = css`
  height: 20%;
`
