/** @jsxImportSource @emotion/react */
import { Button, tokens } from '@fluentui/react-components'
import { colors } from '@/styles/colorPalette'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import Flex from './Flex'
import { Typography } from '@styles/typography'

interface ButtonProps {
  text: string
  onClick?: () => void
  width?: string
  height?: string
  disabled?: boolean
  secondary?: boolean
  typography?: Typography
}

/**
 * @param
 *  onclick: () => void,
 * @param
 * text: string,
 * @param
 *  width?: string,
 * @param
 * height?: string,
 * @param
 * disabled?: boolean
 */
const LargeButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  width,
  height,
  disabled,
  secondary,
  typography = 't6',
}) => {
  return (
    <Flex justify="center" css={searchBoxContainerCss}>
      <Button
        shape="rounded"
        onClick={onClick ? onClick : () => {}}
        appearance={
          secondary ? 'secondary' : disabled ? 'secondary' : 'primary'
        }
        css={buttonCss({ width, height, secondary })}
        disabled={disabled ? disabled : false}
      >
        <Text
          bold={false}
          textAlign="center"
          style={{ color: colors.white }}
          typography={typography}
        >
          {text}
        </Text>
      </Button>
    </Flex>
  )
}

export default LargeButton

const buttonCss = (props: any) => css`
  width: ${props.width ? props.width : '50vw'};
  height: ${props.height ? props.height : '2.5rem'};
  background-color: ${props.secondary ? tokens.colorNeutralStroke1 : null};
  &:hover {
    background-color: ${props.secondary
      ? tokens.colorNeutralStroke1Hover
      : null};
  }
  &:active {
    background-color: ${props.secondary
      ? tokens.colorNeutralStroke1Pressed
      : null};
  }
  min-width: 20px;
`

const searchBoxContainerCss = css`
  white-space: nowrap;
`
