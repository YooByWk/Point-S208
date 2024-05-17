/** @jsxImportSource @emotion/react */
import { Button } from '@fluentui/react-components'
import Text from '@/components/shared/Text'
import { Typography } from '@/styles/typography'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  typography?: Typography
}

const TextButton: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  typography = 't7',
}) => {
  return (
    <Button
      shape="circular"
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
    >
      <Text typography={typography}>{children}</Text>
    </Button>
  )
}

export default TextButton
