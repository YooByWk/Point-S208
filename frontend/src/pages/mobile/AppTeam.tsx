
import { useState } from 'react'
import { css } from '@emotion/react'
import TeamList from '@/components/mobile/Team/TeamList'
import { atom, useRecoilValue, useRecoilState } from 'recoil'
import * as teamState from '@/stores/team'
import CardList from '@/components/shared/CardList'
import { Routes, Route, Outlet } from 'react-router-dom'

const AppTeam = () => {
  const selectedTeam = useRecoilValue(teamState.selectedTeamAlbumIdState)
  const hasSelectedTeam = useRecoilValue(teamState.hasSelectedTeam)
  
  return (
    <div css={bg}>
      <Outlet/>
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
