import { themeState } from '@/stores/common'
import { CardType } from '@/types/cardType'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { BooleanStateType } from '@/types/commonType'
import WebMakeBusinessCard from '@/components/web/WebAlbum/WebMakeBusinessCard'

import { ExternalCardType } from '@/types/ExternalCard'

const DetailCardComponent = ({
  isReal,
  card,
}: {
  isReal: boolean
  card: CardType | ExternalCardType
}) => {
  if (isReal) {
    return card?.cardId ? (
      card.realPicture ? (
        <RealCard $url={card.realPicture} />
      ) : (
        <div css={noCss}>
          <NoCard> 실물 명함 사진이 없습니다.</NoCard>
        </div>
      )
    ) : (
      <div css={noCss}>
        <NoCard> 실물 명함 사진이 없습니다.</NoCard>
      </div>
    )
  } else {
    return (
      card.cardId && ( // 타인 카드에 대한 디지털 생성물 올리기.
        // <RealCard $url={card.digitalPicture} />
        <WebMakeBusinessCard
          cardInfo={card}
          width="245px"
          height="135px"
          typoSmall="t10"
        />
      )
    )
  }
}

const DetailCardSection = ({
  isRealState,
  card,
}: {
  isRealState: BooleanStateType
  card: CardType | ExternalCardType
}) => {
  const theme = useRecoilValue(themeState)
  const { value } = isRealState
  const isReal = value
  return (
    <Container $theme={theme}>
      {/* {card.realPicture ? (
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
      )} */}
      <Wrap>
        {/* <Card $isReal={false}>
          {DetailCardComponent({ isReal: !isReal, card })}
        </Card> */}
        <Card $isReal={true}>
          {DetailCardComponent({ isReal: isReal, card })}
        </Card>
      </Wrap>
      {/* <ArrowHookUpLeft28Regular
        css={changeStyle}
        onClick={() => setIsReal(!isReal)}
      />
      <Desc>{isReal ? '실물' : '디지털'}</Desc> */}
    </Container>
  )
}

export default DetailCardSection

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

const noCss = css`
  width: 245px;
  height: 135px;
`

const Wrap = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
`

const Card = styled.div<{ $isReal: boolean }>`
  position: absolute;
  width: 245px;
  height: 135px;
  border-radius: 10px;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25));
  ${props =>
    props.$isReal
      ? `left: 50%; bottom: 50%; transform: translate(-50%, 50%);`
      : `right: 0; filter: brightness(50%);`}
`

const RealCard = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.$url});
  background-size: contain;
  background-repeat: no-repeat;
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
