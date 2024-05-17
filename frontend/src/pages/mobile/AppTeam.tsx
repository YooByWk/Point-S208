import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

const AppTeam = () => {
  return (
    <div css={bg}>
      <Outlet />
    </div>
  )
}

export default AppTeam

const bg = css`
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    -webkit-appearance: none !important;
  }
`
