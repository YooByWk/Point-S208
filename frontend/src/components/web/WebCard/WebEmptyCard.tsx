/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@shared/Card'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { Edit48Regular } from '@fluentui/react-icons'
import Spacing from '@shared/Spacing'
import { useSetRecoilState } from 'recoil'
import { writeInfoState } from '@/stores/emptyCard'

const WebEmptyCard = ({
  setIsDetail,
}: {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const setWriteInfo = useSetRecoilState(writeInfoState)

  const children = () => {
    return (
      <Text typography="t6" color="white" textAlign="center">
        모바일에서 명함을 추가하거나, <br />
        직접 입력을 통해 명함을 등록해주세요.
      </Text>
    )
  }

  return (
    <>
      <div>
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
    </>
  )
}

export default WebEmptyCard

// style

const linkStyles = css`
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
