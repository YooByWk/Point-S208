/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import { colors } from '@/styles/colorPalette'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { Typography } from '@/styles/typography'

interface DataProps {
  cardInfo: ExternalCardType | CardType
  width?: string
  height?: string
  typoSmall?: Typography
  typoMedium?: Typography
  typoLarge?: Typography
}

interface MainContainerProps {
  width?: string
  height?: string
  typoSmall?: Typography
}

interface leftFlexProps {
  typoSmall?: Typography
}

const WebMakeBusinessCard: React.FC<DataProps> = ({
  cardInfo,
  width,
  height,
  typoSmall,
  typoMedium,
  typoLarge,
}) => {
  if (!typoSmall) typoSmall = 't10'
  return (
    <Flex
      direction="column"
      justify="space-between"
      css={MainContainer({ width, height, typoSmall })}
    >
      <Flex justify="flex-end" css={ImageBox}>
        <Text
          typography={typoMedium ? typoMedium : 't9'}
          color="black"
          bold={true}
        >
          {cardInfo.company}
        </Text>
      </Flex>

      <Flex justify="space-between">
        <Flex
          direction="column"
          justify="flex-end"
          css={LeftFlex({ typoSmall })}
        >
          <Text
            typography={typoLarge ? typoLarge : 't8'}
            color="black"
            bold={true}
          >
            {cardInfo.name}
          </Text>
          {typoSmall !== 't11' && (
            <>
              <Text typography={typoSmall ? typoSmall : 't10'} color="black">
                {cardInfo.department}
              </Text>
              <Text typography="t10" color="black">
                {cardInfo.position}
              </Text>
            </>
          )}
        </Flex>

        {typoSmall !== 't11' && (
          <Flex direction="column" justify="flex-end" css={RightFlex}>
            {cardInfo.landlineNumber && (
              <Text typography={typoSmall ? typoSmall : 't10'} color="black">
                Tel: {cardInfo.landlineNumber}
              </Text>
            )}
            <Text typography={typoSmall ? typoSmall : 't10'} color="black">
              Mobile: {cardInfo.phoneNumber}
            </Text>
            <Text typography={typoSmall ? typoSmall : 't10'} color="black">
              E-mail: {cardInfo.email}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default WebMakeBusinessCard

const LeftFlex = (props: leftFlexProps) => css`
  width: ${props.typoSmall === 't11' ? '100%' : '35%'};
`

const RightFlex = css`
  width: 60%;
`

const MainContainer = (props: MainContainerProps) => css`
  background-color: ${colors.white};
  width: ${props.width ? props.width : '263px'};
  height: ${props.height ? props.height : '150px'};
  border-radius: 10px;
  border: 1px solid ${colors.black};
  padding: ${props.typoSmall === 't11'
    ? '15px 7px 15px 7px'
    : '20px 10px 20px 15px'};
  overflow-y: hidden;
`

const ImageBox = css`
  height: 20%;
`
