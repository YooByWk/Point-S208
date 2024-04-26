/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { dummyCard } from './../../../assets/data/dummyCard'
import type { CardType } from '@/types/cardType'

interface MyDigitalCardProps {
  cardInfo: CardType
  scale?: number
}

const MyDigitalCard: React.FC<MyDigitalCardProps> = ({cardInfo, scale}) => {
  console.log(scale)
  if (!scale) {
    scale = 1
  } 
  // const cardInfo = props.cardInfo
  return (
    <div css={MainContainer({scale})}>
      {/* <Spacing size={20} /> */}
      <Flex justify="flex-end" css={ImageBox}>
        <img src="logo.png" alt="" />
      </Flex>
      <Flex direction="row" justify="space-around">
        <Flex direction="column">
          <Text color="black" typography="t6" bold={true}>
            {' '}
            {cardInfo.name}{' '}
          </Text>
          <Text color="black" typography="t11">
            {cardInfo.rank} / {cardInfo.position}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text color="black" typography="t7" bold={true}>
            {' '}
            포스코 인터네셔널
          </Text>
          <Text color="black" typography='t11'> Tel. {cardInfo.landlineNumber}</Text>
          <Text color="black" typography='t11'> Mobile {cardInfo.phoneNumber}</Text> <Text></Text>
          <Text color="black" typography='t11'> E-mail {cardInfo.email}</Text>
        </Flex>
      </Flex>
    </div>
  )
}

export default MyDigitalCard
const MainContainer = (props:any) => css`
  background-color: ${colors.white};
  /* width: 65%; */
  /* height: 25%; */
  width: 270px;
  height: 150px;
  border-radius: 15px;
  border: 2px solid ${colors.themeText};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 2%;
  transform: scale(${props.scale});
`

const ImageBox = css`
  padding-right: 5vw;
  height: 20%;
`
const InfoDiv = css``
