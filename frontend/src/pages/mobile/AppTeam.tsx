
import { useState } from 'react'
import { css } from '@emotion/react'
import TeamList from '@/components/mobile/Team/TeamList'
import { atom, useRecoilValue, useRecoilState } from 'recoil'
import * as teamState from '@/stores/team'
import CardList from '@/components/shared/CardList'
import { Routes, Route } from 'react-router-dom'
const AppTeam = () => {
  const selectedTeam = useRecoilValue(teamState.selectedTeamIdState)
  const hasSelectedTeam = useRecoilValue(teamState.hasSelectedTeam)
  
  return (
    <div css={bg}>
      
      {/* {hasSelectedTeam ? <CardList/> : <TeamList /> } */}
      <Routes>
        <Route path=":teamId" element={<CardList />} />
        <Route path="/" element={<TeamList />} />
      </Routes>
      
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
