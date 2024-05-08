/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import WebNewlyAdded from './WebNewlyAdded'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'

const WebNewlyAddedCard = ({
  list,
  setIsDetail,
}: {
  list: ExternalCardType[] | CardType[]
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <>
      <Flex direction="column" css={container2Styles}>
        <Flex justify="space-between">
          <Text typography="t7"> 새로 추가된 명함 </Text>
          <Spacing size={0} />
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
            list.slice(0, 5).map(
              (
                card,
                index, // Use slice(0, 5) to get only the first 5 cards
              ) => (
                <div key={index} css={boxStyles}>
                  <WebNewlyAdded card={card} setIsDetail={setIsDetail} />
                </div>
              ),
            )
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
  max-height: calc(100vh - 70px);
  overflow-y: auto;
`
