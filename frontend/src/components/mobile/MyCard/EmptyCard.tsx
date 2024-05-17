/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { Card } from '@shared/Card'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { CameraAdd48Regular, Edit48Regular } from '@fluentui/react-icons'
import Spacing from '@shared/Spacing'
import { useSetRecoilState } from 'recoil'
import { cameraState, writeInfoState } from '@/stores/emptyCard'

const EmptyCard = () => {
  const setWriteInfo = useSetRecoilState(writeInfoState)
  const setCamera = useSetRecoilState(cameraState)

  const children = () => {
    return (
      <Text typography="t6" color="white">
        명함을 추가해 주세요
      </Text>
    )
  }

  return (
    <div style={{ height: '100vh' }}>
      <div css={container}>
        <Card text="80vw" children={children()} />
      </div>
      <Spacing size={50} />
      <Flex justify="space-around">
        <Flex
          direction="column"
          align="center"
          onClick={() => {
            setCamera(true)
          }}
          css={linkStyles}
        >
          <CameraAdd48Regular />
          <Text typography="t7">직접 촬영</Text>
        </Flex>
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
      </Flex>
    </div>
  )
}

export default EmptyCard

// style

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.gray02};
`

// css

const linkStyles = css`
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
