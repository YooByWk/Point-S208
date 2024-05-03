/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ShareAndroid16Filled } from '@fluentui/react-icons'
import { Button } from '@fluentui/react-components'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'

interface CardInfo {
  card_id: number
  name: string
  company: string
  department: string
  position: string
  rank?: string
  email: string
  landlineNumber: string
  fax_number?: string
  phoneNumber: string
  address?: string
  real_picture: string
  digital_picture: string
  front_back: 'front' | 'back'
  domain_url?: string
}

const WebNewlyAdded = ({ card }: { card: CardInfo }) => {
  return (
    <>
      <Flex css={boxBorderStyles} align="center">
        {/* 사진 */}
        <div css={boxStyles}>
          <img src={card.real_picture} alt="card" />
        </div>
        {/* 정보 */}
        <Flex direction="column" justify="center" css={boxBorderStyles2}>
          <Text typography="t7">{card.company}</Text>
          <Text typography="t7">{card.name}</Text>
          <Text typography="t7">{card.phoneNumber}</Text>
          <Text typography="t7">{card.email}</Text>
        </Flex>
        {/* 공유버튼 */}
        <Button appearance="transparent">
          <ShareAndroid16Filled /> 공유
        </Button>
      </Flex>
    </>
  )
}

export default WebNewlyAdded

const boxStyles = css`
  width: 10vw;
  height: 5vw;
  border: 1px solid black;
  margin: 10px;
`

const boxBorderStyles = css`
  border-bottom: 1px solid ${colors.themeGray};
`

const boxBorderStyles2 = css`
  width: 25vw;
  border-left: 1px solid ${colors.themeGray};
  padding: 10px 0 10px 10px;
`
