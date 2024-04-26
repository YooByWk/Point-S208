import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'

import Text from './Text'
import Input from './Input'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
  isRequired?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      hasError,
      helpMessage,
      isRequired = false,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
    const [focused, setFocused] = useState(false)

    const labelColor =
      hasError && isRequired
        ? 'themeRed'
        : focused
        ? 'themeMainBlue'
        : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div>
        {label ? (
          <Text
            typography="t9"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label} {isRequired ? '*' : ''}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {helpMessage ? (
          <Text
            typography="t10"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
