/** @jsxImportSource @emotion/react */
import { themeState } from '@/stores/common'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { isFrontState, isRealState } from '@/stores/card'
import { frontCardState, backCardState } from '@/stores/card'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'
import { useEffect, useRef } from 'react'
import { toPng } from 'html-to-image'

const CardComponent = (isFront: boolean) => {
  const isReal = useRecoilValue(isRealState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    toPng(containerRef.current)
      .then(dataUrl => {
        // 이미지 생성 성공 시 처리할 작업
        const img = new Image()
        img.src = dataUrl
        // document.body.appendChild(img) // 이미지를 DOM에 추가하거나 원하는 작업 수행
      })
      .catch(error => {
        // 오류 처리
        console.error('이미지 생성 오류:', error.message)
      })
  }, [frontCard, backCard])

  return (
    <>
      {isReal ? (
        isFront ? (
          frontCard.realPicture ? (
            <RealCard $url={frontCard.realPicture} />
          ) : (
            <NoCard>모바일에서 실물 명함을 추가해 주세요</NoCard>
          )
        ) : backCard.realPicture ? (
          <RealCard $url={backCard.realPicture} />
        ) : (
          <NoCard>모바일에서 실물 명함을 추가해 주세요</NoCard>
        )
      ) : isFront ? (
        <div ref={containerRef}>
          <MyDigitalCard cardInfo={frontCard} scale={1} border={false} />
        </div>
      ) : (
        <div ref={containerRef}>
          <MyDigitalCard cardInfo={backCard} scale={1} border={false} />
        </div>
      )}
    </>
  )
}

const WebCardSection = () => {
  const theme = useRecoilValue(themeState)
  const isFront = useRecoilValue(isFrontState)

  return (
    <Container $theme={theme}>
      <Wrap>
        <Card $isFront={false}>{CardComponent(!isFront)}</Card>
        <Card $isFront={true}>{CardComponent(isFront)}</Card>
      </Wrap>
    </Container>
  )
}

export default WebCardSection

// style

const Container = styled.div<{ $theme: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 190px;
`

const Wrap = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
`

const Card = styled.div<{ $isFront: boolean }>`
  position: absolute;
  width: 263px;
  height: 150px;
  border-radius: 10px;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25));
  ${props =>
    props.$isFront
      ? `left: 100px; bottom: 0;`
      : `right: 100px; filter: brightness(50%);`}
`

const RealCard = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.$url});
  background-size: cover;
`

const NoCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  border-radius: 10px;
  color: #fff;
`
