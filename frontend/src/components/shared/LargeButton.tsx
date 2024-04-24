import { Button, makeStyles } from '@fluentui/react-components'
import { colors, Colors } from '@/styles/colorPalette'
import { CSSProperties } from 'react'
/** @jsxImportSource @emotion/react */
// import type { ButtonProps } from "@fluentui/react-components"
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
interface ButtonProps {
  text: string
  onClick: () => void
  width?:   string 
  height?:   string
  disabled?: boolean
  secondary?: boolean
}

const LargeButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  width,
  height,
  disabled,
}) => {
  console.log(width)
  return (
    <div>
      <Button
        shape="rounded"
        onClick={onClick}
        appearance="primary"
        css={buttonCss({ width, height })}
      >
        <Text
          bold={true}
          textAlign="center"
          style={{ color: colors.themeText }}
        >
          {text}
        </Text>
      </Button>
    </div>
  )
}

export default LargeButton

const buttonCss = (props: any) => css`
  background-color: ${props.width ? 'red': 'blue'};
  width: ${props.width ? props.width : '10rem'};
  height: ${props.height ? props.height : '2.5rem'};
  color: ${colors.themeTextInverted};
  /* border-radius: 10px; */
  /* border: none; */
`;



        // style={{
        //   width: width ? `${width}%` : '10rem',
        //   height: height ? `${height}%` : '2.5rem',
        //   color: colors.themeTextInverted,
        //   borderRadius: '10px',
        //   border: 'none',
        // }}