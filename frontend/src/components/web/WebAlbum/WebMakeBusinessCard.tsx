/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import { colors } from '@/styles/colorPalette'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

const WebMakeBusinessCard = ({
  cardInfo,
}: {
  cardInfo: ExternalCardType | CardType
}) => {
  return (
    <Flex direction="column" justify="space-between" css={MainContainer}>
      <Flex justify="flex-end" css={ImageBox}>
        <Text typography="t9" color="black" bold={true}>
          {cardInfo.company}
        </Text>
      </Flex>

      <Flex justify="space-between">
        <Flex direction="column" css={LeftFlex}>
          <Text typography="t8" color="black" bold={true}>
            {cardInfo.name}
          </Text>
          <Text typography="t10" color="black">
            {cardInfo.department}
          </Text>
          <Text typography="t10" color="black">
            {cardInfo.position}
          </Text>
        </Flex>

        <Flex direction="column" justify="flex-end" css={RightFlex}>
          {cardInfo.landlineNumber && (
            <Text typography="t10" color="black">
              Tel: {cardInfo.landlineNumber}
            </Text>
          )}
          <Text typography="t10" color="black">
            Mobile: {cardInfo.phoneNumber}
          </Text>
          <Text typography="t10" color="black">
            E-mail: {cardInfo.email}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WebMakeBusinessCard

const LeftFlex = css`
  width: 35%;
`

const RightFlex = css`
  width: 60%;
`

const MainContainer = css`
  background-color: ${colors.white};
  width: 263px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid ${colors.black};
  padding: 20px 10px 20px 15px;
`

const ImageBox = css`
  height: 20%;
`
