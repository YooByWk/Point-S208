import { CSSProperties } from 'react'
import { Typography, typographyMap } from '@styles/typography'

import styled from '@emotion/styled'

interface TextProps {
  typography?: Typography
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ display, textAlign, fontWeight, bold }) => ({
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
