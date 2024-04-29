import { Button, makeStyles, tokens } from '@fluentui/react-components'
import { colors, Colors } from '@/styles/colorPalette'
import { CSSProperties } from 'react'
/** @jsxImportSource @emotion/react */
// import type { ButtonProps } from "@fluentui/react-components"
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import Flex from './Flex'
interface ButtonProps {
  text: string
  onClick?: () => void
  width?:   string 
  height?:   string
  disabled?: boolean
  secondary?: boolean
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
  secondary
}) => {
  return (
    <Flex  justify='center' css={searchBoxContainerCss} >
      <Button
        shape="rounded"
        onClick={onClick? onClick : () => {}}
        appearance= {secondary? "secondary" : disabled ? "secondary" : "primary"}
        css={buttonCss({ width, height, secondary })}
        disabled={disabled? disabled : false}
      >
        <Text
          bold={false}
          textAlign="center"
          style={{ color: colors.white }}
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
  &:hover{
    background-color: ${props.secondary ? tokens.colorNeutralStroke1Hover : null};
  }
  &:active{
    background-color: ${props.secondary ? tokens.colorNeutralStroke1Pressed : null};
  }
`;

const searchBoxContainerCss = css`
  /* background-color: ${tokens.colorNeutralBackground1}; */
`

