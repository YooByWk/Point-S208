import { Button, makeStyles  } from "@fluentui/react-components"
import { colors, Colors } from "@/styles/colorPalette"
import { CSSProperties } from "react"
// import type { ButtonProps } from "@fluentui/react-components"
import  Text  from "@/components/shared/Text"
interface ButtonProps {
  text: string
  onClick: () => void
  width?: number
  height?: number 
  disabled?: boolean
  bgColor?: Colors
  
}


const LargeButton: React.FC<ButtonProps> = ({text, onClick, width, height, disabled, bgColor}) => {
  
  return (
  <>
    <Button
    shape="rounded"
    onClick={onClick}
    appearance="primary"
    >
        <Text 
          color='white'
          bold={true}
          textAlign='center'
        >
          {text}
        </Text>
          
    </Button>
  </>
  )
}

export default LargeButton
