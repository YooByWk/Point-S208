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
import { useCallback } from 'react'
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
  const dummyUrl =
    'https://1drv.ms/i/c/60d1136c8e1eeac5/IQPtHI8a_PwASK5IZLcow2yZAdjLhrrPZqV_cjryVMdkpRA?width=150&height=120'

  return (
    <>
      {isReal ? (
        isFront ? (
          <RealCard $url={dummyUrl} />
        ) : (
          <RealCard $url={dummyUrl} />
        )
      ) : isFront ? (
        <MyDigitalCard cardInfo={frontCard} scale={1} border={false} />
      ) : (
        <MyDigitalCard cardInfo={backCard} scale={1} border={false} />
      )}
    </>
  )
}

const CardSection = () => {
  const theme = useRecoilValue(themeState)
  const [isReal, setIsReal] = useRecoilState(isRealState)
  const [isFront, setIsFront] = useRecoilState(isFrontState)
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsReal(e.currentTarget.checked)
    },
    [setIsReal],
  )

  return (
    <Container $theme={theme}>
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
  background-size: cover;
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
