import styled from '@emotion/styled'
import { tokens } from '@fluentui/react-components'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
}

// <Spacing size={16} />

const Spacing = styled.div<SpacingProps>`
  /* background-color: ${tokens.colorNeutralBackground1}; */
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}
`

export default Spacing
