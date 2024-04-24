import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.gray02};
`

export const card = (width: string) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: calc(${width} * 0.55);
  background-color: ${colors.gray02};
  border-radius: 15px;
  margin: 30px auto;
`

export const text = css`
  font-size: large;
`
