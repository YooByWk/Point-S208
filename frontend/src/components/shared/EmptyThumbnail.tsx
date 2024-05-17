/** @jsxImportSource @emotion/react */
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

const EmptyThumbnail = () => {
  return (
    <div css={container}>
      <Text typography="t10" color="themeTextInverted" bold={true}>
        명함 사진이
        <br /> 없습니다.
      </Text>
    </div>
  )
}

export default EmptyThumbnail

const container = css`
  max-width: 30vw;
  width: 120px;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${colors.themeGray};
  border-radius: 15px;
`
