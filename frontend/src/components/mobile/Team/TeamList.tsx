/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import { dummyTeamList } from '@/assets/data/dummyTeamList'
import Spacing from '@/components/shared/Spacing'
import TeamCard from '@/components/mobile/Team/TeamCard'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import * as teamState from '@/stores/team'

const TeamList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTeam, setSelectedTeam] = useRecoilState(
    teamState.selectedTeamIdState,
  )

  return (
    <div>
      <SearchBox
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          console.log(searchValue, '검색어 확인')
        }}
        memberIcon={false}
        placeholder="팀 검색"
      />
      {/* <MyDigitalCard  cardInfo={CardDummy} scale={1} /> */}
      {/*  for문으로 팀을 만들겠지? */}
      {dummyTeamList.map(team => {
        return (
          <TeamCard
            teamInfo={team}
            key={team.teamId}
            onClick={() => {
              console.log('팀 클릭')
              setSelectedTeam(team)
              console.log(selectedTeam)
            }}
          />
        )
      })}

      <Spacing size={30} direction="vertical" />
      <LargeButton
        text="팀 추가"
        onClick={() => {
          console.log('팀 추가')
        }}
        width="80%"
      />
    </div>
  )
}

export default TeamList
