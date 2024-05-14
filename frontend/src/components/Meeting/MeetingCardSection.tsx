/** @jsxImportSource @emotion/react */
import { themeState } from '@/stores/common'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ArrowHookUpLeft28Regular } from '@fluentui/react-icons'
import { isFrontState } from '@/stores/card'
import { frontCardState, backCardState } from '@/stores/card'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'

const CardComponent = (isFront: boolean) => {
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const card = isFront ? frontCard : backCard

  return card?.cardId ? (
    <MyDigitalCard cardInfo={card} scale={1} border={false} />
  ) : (
    <NoCard>
      {isFront ? '국문 명함을 추가해주세요' : '영문 명함을 추가해주세요'}
    </NoCard>
  )
}

const MeetingCardSection = () => {
  const theme = useRecoilValue(themeState)
  const [isFront, setIsFront] = useRecoilState(isFrontState)

  return (
    <Container $theme={theme}>
      <Wrap>
        <Card $isFront={false}>{CardComponent(!isFront)}</Card>
        <Card $isFront={true}>{CardComponent(isFront)}</Card>
      </Wrap>
      <ArrowHookUpLeft28Regular
        css={changeStyle}
        onClick={() => setIsFront(!isFront)}
      />
      <Desc>{isFront ? '국문' : '영문'}</Desc>
    </Container>
  )
}

export default MeetingCardSection

// style

const Container = styled.div<{ $theme: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
`

const Wrap = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
`

const Card = styled.div<{ $isFront: boolean }>`
  position: absolute;
  width: 170px;
  height: 100px;
  border-radius: 10px;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25));
  ${props =>
    props.$isFront
      ? `left: 0; bottom: 0;`
      : `right: 0; filter: brightness(50%);`}
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

const Desc = styled.div`
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  margin: 3%;
`

// css

const changeStyle = css`
  position: absolute;
  right: 0;
  margin: 3%;
  color: ${colors.themeText};
`
