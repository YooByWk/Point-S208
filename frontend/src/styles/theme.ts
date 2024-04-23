export const colors = {
  // posco color
  poscoBlue: '05507D',
  poscoLightBlue: '00A5E5',
  poscoDarkGray: '4B5151',
  poscoLightGray: 'BDBDBA',
  poscoGold: '89744F',
  poscoSilver: '8E9091',
  // other color
  gray01: 'F4F4F4',
  black01: '1F1F1F',
  black02: '2E2E2E',
  yellow01: 'FFF500',
  ssafyBlue: '3C93E8',
  ssafyLightBlue: '6DCEF5',
  teamsBG6: '9499F5',
}

export const size = {
  smallest: '320px',
  smaller: '550px',
  small: '768px',
  medium: '948px',
  large: '1280px',
  larger: '1440px',
  largest: '1920px',
}

export const mediaQuery = {
  // Mobile
  mobileBasic: `@media only screen and (min-width: ${size.smallest})`,
  mobileFold: `@media only screen and (min-width: ${size.smaller})`,

  // Desktop
  // The digit is the number of columns
  desktop1: `@media only screen and (min-width: ${size.small})`,
  // Toggle default starting at 948px
  desktop1plus: `@media only screen and (min-width: ${size.medium})`,
  desktop2: `@media only screen and (min-width: ${size.large})`,
  desktop3: `@media only screen and (min-width: ${size.larger})`,
  desktop4: `@media only screen and (min-width: ${size.largest})`,
}
