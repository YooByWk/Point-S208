/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@shared/Card'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { Edit48Regular } from '@fluentui/react-icons'
import Spacing from '@shared/Spacing'
import { useSetRecoilState } from 'recoil'
import { writeInfoState } from '@/stores/emptyCard'
import WebTopBar from './WebTopBar'
import WebNewlyAddedCard from './WebNewlyAddedCard'
import { colors } from '@/styles/colorPalette'

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

const WebEmptyBackCard = ({
  setIsCard,
  isFront,
  setIsFront,
  data,
}: {
  setIsCard: (isCard: boolean) => void
  isFront: boolean
  setIsFront: (isFront: boolean) => void
  data: DataProps
}) => {
  const setWriteInfo = useSetRecoilState(writeInfoState)

  const children = () => {
    return (
      <Text typography="t6" color="white" textAlign="center">
        모바일에서 영문 명함을 추가하거나, <br />
        직접 입력을 통해 영문 명함을 등록해주세요.
      </Text>
    )
  }

  return (
    <>
      <Flex justify="center">
        <Flex direction="column" css={containerStyles}>
          <WebTopBar
            isFront={isFront}
            setIsFront={setIsFront}
            setIsCard={setIsCard}
            setEditOpen={() => {}}
          />
          <Spacing size={10} />
          <div css={boxStyles}>
            <Card text="500px" children={children()} />
            <Spacing size={50} />
            <Flex
              direction="column"
              align="center"
              onClick={() => {
                setWriteInfo(true)
              }}
              css={linkStyles}
            >
              <Edit48Regular />
              <Text typography="t7">직접 입력</Text>
            </Flex>
          </div>
        </Flex>
        <WebNewlyAddedCard list={data.list} />
      </Flex>
    </>
  )
}

export default WebEmptyBackCard

// style

const linkStyles = css`
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
const containerStyles = css`
  padding-top: 10px;
  padding-right: 10px;
  border-right: 1px solid ${colors.themeGray};
`
const boxStyles = css`
  width: 46vw;
`
