/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import type { CardType } from '@/types/cardType'
import styled from '@emotion/styled'

interface MyDigitalCardProps {
  cardInfo: CardType
  scale?: number
  border?: boolean
}

interface MainContainerProps {
  scale?: number
  border?: boolean
}

const MyDigitalCard: React.FC<MyDigitalCardProps> = ({
  cardInfo,
  scale,
  border,
}) => {
  // console.log(scale)
  if (!scale) {
    scale = 1.1
  }
  // const cardInfo = props.cardInfo
  return (
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
              ? '포스코 인터네셔널'
              : 'POSCO INTERNATIONAL'}
          </Company>
          <Desc>Tel {cardInfo.landlineNumber}</Desc>
          <Desc>Mobile {cardInfo.phoneNumber}</Desc>
          <Desc>E-mail {cardInfo.email}</Desc>
        </RightFlex>
      </Flex>
    </div>
  )
}

export default MyDigitalCard

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
