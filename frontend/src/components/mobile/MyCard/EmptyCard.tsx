/** @jsxImportSource @emotion/react */
import { Card } from '@shared/Card'
import * as s from './EmptyCard.styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { CameraAdd48Regular, Edit48Regular } from '@fluentui/react-icons'
import Spacing from '@shared/Spacing'
import { writeInfoState } from '@stores/writeInfo'
import { useSetRecoilState } from 'recoil'
import { css } from '@emotion/react'

const EmptyCard = () => {
  const setWriteInfo = useSetRecoilState(writeInfoState)

  const children = () => {
    return (
      <Text typography="t6" color="white">
        명함을 추가해 주세요
      </Text>
    )
  }

  return (
    <>
      <div css={s.container}>
        <Card text="80vw" children={children()} />
      </div>
      <Spacing size={50} />
      <Flex justify="space-around">
        <Flex
          direction="column"
          align="center"
          onClick={() => {
            console.log('직접 촬영')
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
            console.log('직접 입력')
            setWriteInfo(true)
          }}
          css={linkStyles}
        >
          <Edit48Regular />
          <Text typography="t7">직접 입력</Text>
        </Flex>
      </Flex>
    </>
  )
}

const linkStyles = css`
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`

export default EmptyCard
