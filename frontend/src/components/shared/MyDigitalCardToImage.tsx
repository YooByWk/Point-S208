/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from '@/components/shared/Flex'
import { CardType } from '@/types/cardType'
import { toPng } from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import { colors } from '@/styles/colorPalette'

interface MyDigitalCardProps {
  cardInfo: CardType
  scale?: number
  border?: boolean
}

interface MainContainerProps {
  scale?: number
  border?: boolean
}

const MyDigitalCardToImage = ({
  cardInfo,
  scale,
  border,
}: MyDigitalCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [image, setImage] = useState(new Image())

  useEffect(() => {
    image.onload = () => {
      setLogoLoaded(true)
    }
    image.src = 'logo.png'
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    toPng(containerRef.current)
      .then(dataUrl => {
        // 이미지 생성 성공 시 처리할 작업
        const img = new Image()
        img.src = dataUrl
        document.body.appendChild(img) // 이미지를 DOM에 추가하거나 원하는 작업 수행
      })
      .catch(error => {
        // 오류 처리
        console.error('이미지 생성 오류:', error.message)
      })
  }, [logoLoaded])

  return (
    <div ref={containerRef}>
      {logoLoaded && (
        <div css={MainContainer({ scale, border })}>
          <Flex justify="flex-end" css={ImageBox}>
            <img src="logo.png" alt="포스코 인터내셔널" />
          </Flex>

          <Flex justify="space-between">
            <LeftFlex>
              <Name>{cardInfo.name}</Name>
              <Desc>{cardInfo.department}</Desc>
              <Desc>{cardInfo.position}</Desc>
            </LeftFlex>

            <RightFlex>
              <Company>
                {cardInfo.frontBack === 'FRONT'
                  ? '포스코 인터내셔널'
                  : 'POSCO INTERNATIONAL'}
              </Company>
              <Desc>Tel {cardInfo.landlineNumber}</Desc>
              <Desc>Mobile {cardInfo.phoneNumber}</Desc>
              <Desc>E-mail {cardInfo.email}</Desc>
            </RightFlex>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default MyDigitalCardToImage

// style
const LeftFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const RightFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px 20px 15px;
  transform: scale(${props.scale});
`

const ImageBox = css`
  height: 20%;
`
