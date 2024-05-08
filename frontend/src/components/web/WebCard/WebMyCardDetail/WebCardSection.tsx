/** @jsxImportSource @emotion/react */
import { themeState } from '@/stores/common'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { isFrontState, isRealState } from '@/stores/card'
import { frontCardState, backCardState } from '@/stores/card'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'

const CardComponent = (isFront: boolean) => {
  const isReal = useRecoilValue(isRealState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const dummyUrl =
    'https://1drv.ms/i/c/60d1136c8e1eeac5/IQPtHI8a_PwASK5IZLcow2yZAdjLhrrPZqV_cjryVMdkpRA?width=150&height=120'

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
        <MyDigitalCard cardInfo={frontCard} scale={1} border={false} />
      ) : (
        <MyDigitalCard cardInfo={backCard} scale={1} border={false} />
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
