/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import { ShareAndroid16Filled } from '@fluentui/react-icons'
import { Button } from '@fluentui/react-components'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { Image } from '@fluentui/react-components'
import styled from '@emotion/styled'

const MeetingCardThumbnail = ({
  card,
}: {
  card: ExternalCardType | CardType
}) => {
  return (
    <Flex css={boxBorderStyles} align="center">
      <Flex align="center">
        <Flex direction="column" align="center" justify="center">
          {/* 사진 */}
          <Flex css={boxStyles} align="center">
            {card.realPicture ? (
              <Image
                fit="contain"
                src={card.realPicture}
                alt={`${card.name}'s card`}
              />
            ) : (
              <NoCard>실물 명함이 없습니다.</NoCard>
            )}
            {/* 공유버튼 */}
          </Flex>
          <Button appearance="transparent">
            <ShareAndroid16Filled /> 공유
          </Button>
        </Flex>
        {/* 정보 */}
        <Flex direction="column" justify="center" css={boxBorderStyles2}>
          <Text typography="t9">{card.company}</Text>
          <Text typography="t9">{card.name}</Text>
          <Text typography="t9">{card.phoneNumber}</Text>
          <Text typography="t9">{card.email}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MeetingCardThumbnail

const NoCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  border-radius: 10px;
  color: #fff;
  font-size: 6px;
`

const boxStyles = css`
  width: 50px;
  height: 30px;
  margin: 10px;
`

const boxBorderStyles = css`
  border-bottom: 1px solid ${colors.themeGray};
`

const boxBorderStyles2 = css`
  width: 50vw;
  border-left: 1px solid ${colors.themeGray};
  padding: 10px 0 10px 10px;
`
