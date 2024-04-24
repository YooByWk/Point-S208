/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/colorPalette'
import { StringChildType } from '@/types/commonType'
import { css } from '@emotion/react'

const card = (width: string) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: calc(${width} * 0.55);
  background-color: ${colors.gray02};
  border-radius: 15px;
  margin: 30px auto;
`

export const Card = ({ text, children }: StringChildType) => {
  return <div css={card(text)}>{children}</div>
}
