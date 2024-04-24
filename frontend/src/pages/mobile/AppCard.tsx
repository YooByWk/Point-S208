import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

import { CameraAdd48Regular, Edit48Regular } from '@fluentui/react-icons'
import { css } from '@emotion/react'

const AppCard = () => {
  return (
    <>
      <Text>모바일 내 명함</Text>
      <Flex justify="space-around" css={iconsStyles}>
        <Flex direction="column" align="center">
          <CameraAdd48Regular />
          <Text typography="t7">직접 촬영</Text>
        </Flex>
        <Flex direction="column" align="center">
          <Edit48Regular />
          <Text typography="t7">직접 입력</Text>
        </Flex>
      </Flex>
    </>
  )
}

const iconsStyles = css`
  margin: 0 auto;
`

export default AppCard
