/** @jsxImportSource @emotion/react */
import { themeState } from '@/stores/common'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Switch,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  ErrorCircle20Regular,
  ArrowHookUpLeft28Regular,
} from '@fluentui/react-icons'
import Flex from '@/components/shared/Flex'
import { isFrontState, isRealState } from '@/stores/card'
import { frontCardState, backCardState } from '@/stores/card'
import MyDigitalCard from '../MyDigitalCard'

const CardComponent = (isFront: boolean) => {
  const isReal = useRecoilValue(isRealState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const card = isFront ? frontCard : backCard

  if (isReal) {
    return card?.cardId ? (
      <RealCard $url={card.realPicture} />
    ) : (
      <NoCard>
        {isFront ? '국문 명함을 추가해주세요' : '영문 명함을 추가해주세요'}
      </NoCard>
    )
  } else {
    return card?.cardId ? (
      <MyDigitalCard cardInfo={card} scale={1} border={false} />
    ) : (
      <NoCard>
        {isFront ? '국문 명함을 추가해주세요' : '영문 명함을 추가해주세요'}
      </NoCard>
    )
  }
}

const CardSection = () => {
  const theme = useRecoilValue(themeState)
  const [isReal, setIsReal] = useRecoilState(isRealState)
  const [isFront, setIsFront] = useRecoilState(isFrontState)
  const frontCard = useRecoilValue(frontCardState)
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsReal(e.currentTarget.checked)
    },
    [setIsReal],
  )

  useEffect(() => {
    !frontCard.realPicture && setIsReal(false)
  }, [])

  return (
    <Container $theme={theme}>
      {frontCard.realPicture ? (
        <SwitchBtn>
          <Switch
            checked={isReal}
            onChange={onChange}
            css={switchStyle(isReal)}
          />
          <Flex align="center">
            <Popover withArrow>
              <PopoverTrigger disableButtonEnhancement>
                <ErrorCircle20Regular css={errorCircleStyle} />
              </PopoverTrigger>
              <PopoverSurface tabIndex={-1} css={popoverStyle}>
                실물명함과 디지털명함을 교차 선택합니다.
              </PopoverSurface>
            </Popover>
          </Flex>
        </SwitchBtn>
      ) : (
        ''
      )}

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

export default CardSection

// style

const Container = styled.div<{ $theme: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  background: ${props =>
    props.$theme === 'dark'
      ? `linear-gradient(238deg, #286c95 -0.51%, #000 89.73%)`
      : `linear-gradient(246deg, #05507d 0%, #eff9ff 100%)`};
`

const Wrap = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
`

const Card = styled.div<{ $isFront: boolean }>`
  position: absolute;
  width: 245px;
  height: 135px;
  border-radius: 10px;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25));
  ${props =>
    props.$isFront
      ? `left: 0; bottom: 0;`
      : `right: 0; filter: brightness(50%);`}
`

const RealCard = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.$url});
  background-size: contain;
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

const SwitchBtn = styled.div`
  position: absolute;
  display: flex;
  z-index: 10;
  margin: 2%;
  top: 0;
  left: 0;
`

const Desc = styled.div`
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  margin: 3%;
`

// css

const switchStyle = (isReal: boolean) => css`
  .fui-Switch__indicator {
    background-color: ${isReal
      ? colors.themeText
      : colors.themeTextInverted} !important;

    color: ${isReal ? colors.themeTextInverted : colors.themeText} !important;
  }
`

const errorCircleStyle = css`
  color: white;
`

const changeStyle = css`
  position: absolute;
  right: 0;
  margin: 3%;
  color: white;
`

const popoverStyle = css`
  background-color: ${colors.gray02};
  color: #fff;
  padding: 8px;
`
