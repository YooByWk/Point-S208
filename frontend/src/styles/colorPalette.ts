import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --poscoBlue: #05507d;
    --poscoLightBlue: #00a5e5;
    --poscoDarkGray: #4b5151;
    --poscoLightGray: #bdbdba;
    --poscoGold: #89744f;
    --poscoSilver: #8e9091;
    --gray01: #f4f4f4;
    --gray02: #383838;
    --black01: #1f1f1f;
    --black02: #2e2e2e;
    --yellow01: #fff500;
    --ssafyBlue: #3c93e8;
    --ssafyLightBlue: #6dcef5;
    --teamsBG6: #9499f5;
    --white: #fff;
    --black: #000;
    --red: #f44336;
  }
`

export const colors = {
  poscoBlue: 'var(--poscoBlue)',
  poscoLightBlue: 'var(--poscoLightBlue)',
  poscoDarkGray: 'var(--poscoDarkGray)',
  poscoLightGray: 'var(--poscoLightGray)',
  poscoGold: 'var(--poscoGold)',
  poscoSilver: 'var(--poscoSilver)',
  gray01: 'var(--gray01)',
  gray02: 'var(--gray02)',
  black01: 'var(--black01)',
  black02: 'var(--black02)',
  yellow01: 'var(--yellow01)',
  ssafyBlue: 'var(--ssafyBlue)',
  ssafyLightBlue: 'var(--ssafyLightBlue)',
  teamsBG6: 'var(--teamsBG6)',
  white: 'var(--white)',
  black: 'var(--black)',
  red: 'var(--red)',
}

export type Colors = keyof typeof colors
