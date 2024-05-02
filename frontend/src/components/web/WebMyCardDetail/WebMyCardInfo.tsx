/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PersonBoard32Filled, Phone32Regular } from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { colors } from '@styles/colorPalette'
import WebCardSection from './WebCardSection'

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

interface DataProps {
  userId: number
  front: CardInfo
  back?: CardInfo
  list: CardInfo[]
}

const WebMyCardInfo = ({
  isFront,
  data,
}: {
  isFront: boolean
  data: DataProps
}) => {
  return (
    <>
      <Flex direction="column">
        <div css={boxStyles}>
          <WebCardSection />
        </div>
        <Spacing size={20} />
        <Flex direction="column" css={container3Styles}>
          <Flex justify="flex-start" align="center">
            <PersonBoard32Filled />
            <Text bold={true}>명함 정보</Text>
          </Flex>
          <Spacing size={20} />
          <Flex>
            <Text typography="t6">회사</Text>
            <Spacing size={60} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.company : data.back!.company}
            </Text>
          </Flex>
          <Flex>
            <Text typography="t6">부서</Text>
            <Spacing size={60} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.department : data.back!.department}
            </Text>
          </Flex>
          <Flex>
            <Text typography="t6">직책</Text>
            <Spacing size={60} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.position : data.back!.position}
            </Text>
          </Flex>
          <Spacing size={20} />
        </Flex>

        <Spacing size={20} />
        <Flex direction="column">
          <Flex justify="flex-start" align="center">
            <Phone32Regular />
            <Text bold={true}>연락처</Text>
          </Flex>
          <Spacing size={20} />
          <Flex>
            <Text typography="t6">이메일</Text>
            <Spacing size={40} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.email : data.back!.email}
            </Text>
          </Flex>
          <Flex>
            <Text typography="t6">유선전화</Text>
            <Spacing size={20} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.landlineNumber : data.back!.landlineNumber}
            </Text>
          </Flex>
          <Flex>
            <Text typography="t6">휴대전화</Text>
            <Spacing size={20} direction="horizontal" />
            <Text typography="t6">
              {isFront ? data.front.phoneNumber : data.back!.phoneNumber}
            </Text>
          </Flex>
          <Spacing size={10} />
        </Flex>
      </Flex>
    </>
  )
}

export default WebMyCardInfo

const container3Styles = css`
  border-bottom: 1px solid ${colors.themeGray};
`

const boxStyles = css`
  width: 46vw;
`
