/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { SearchBox } from '@fluentui/react-components'
import WebNewlyAdded from './WebNewlyAdded'

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

const WebNewlyAddedCard = ({ list }: { list: CardInfo[] }) => {
  return (
    <>
      <Flex direction="column" css={container2Styles}>
        <Flex justify="space-between">
          <Text typography="t7"> 새로 추가된 명함 </Text>
          <SearchBox
            appearance="underline"
            size="medium"
            placeholder="명함 검색"
          />
        </Flex>
        <Spacing size={10} />

        <Flex direction="column" css={setMaxHeight}>
          {list.length === 0 ? (
            <>
              <Spacing size={20} />
              <Text textAlign="center" typography="t7" css={boxStyles}>
                새로 추가된 명함이 없습니다.
              </Text>
            </>
          ) : (
            list.map((card, index) => (
              <div key={index} css={boxStyles}>
                <WebNewlyAdded card={card} />
              </div>
            ))
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default WebNewlyAddedCard

const container2Styles = css`
  padding-top: 13px;
  padding-left: 10px;
`

const boxStyles = css`
  width: 47vw;
`

const setMaxHeight = css`
  max-height: calc(100vh - 80px);
  overflow-y: auto;
`
