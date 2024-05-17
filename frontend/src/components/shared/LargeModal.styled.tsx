import { css } from '@emotion/react'

export const largeModalBody = (props: any) => css`
  height: ${props.height ? props.height : '25vh'};
`

export const largeModalButton = (props: any) => css`
  width: ${props.width ? props.width : '10vw'};
  height: ${props.height ? props.height : '2.5rem'};
`
