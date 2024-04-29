/** @jsxImportSource @emotion/react */
import { dummyTeamList } from '@/assets/data/dummyTeamList'
import Spacing from '@/components/shared/Spacing'
import TeamCard from '@/components/mobile/Team/TeamCard'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import * as teamState from '@/stores/team'
import { css } from '@emotion/react'
import LargeButton from '@/components/shared/LargeButton'
import AddTeam from '@/components/mobile/Team/AddTeam'
import { tokens } from '@fluentui/react-components';
import { useNavigate, useParams } from 'react-router-dom'


const TeamList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isWrite, setIsWrite] = useState(false)
  const [selectedTeam, setSelectedTeam] = useRecoilState(
    teamState.selectedTeamIdState,
  )
  const navigate = useNavigate()
  return (
    <>
    {!isWrite ? <>
      <SearchBox
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          console.log(searchValue, '검색어 확인')
        }}
        memberIcon={false}
        placeholder="팀 검색"
      />
      <Spacing size={30}/>
      {/* <MyDigitalCard  cardInfo={CardDummy} scale={1} /> */}
      {dummyTeamList.map(team => {
        return (
          <TeamCard
            teamInfo={team}
            key={team.teamId}
            onClick={ () =>  {
              console.log('팀 클릭', team.teamId)
               setSelectedTeam(team)
              navigate(`/myTeam/${team.teamId}`)
            }}
          />
        )
      })}
      
      <Spacing size={30} direction="vertical" />
      <div css={buttonCss}>
      <LargeButton text='팀 추가' width='80%' onClick={() =>setIsWrite(true)} />
        </div>
    </> :
    <AddTeam 
      isWrite={isWrite}
      setIsWrite={setIsWrite}
    />
  }
  </>
  )
}

export default TeamList
const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 0vh;
  z-index: 999;
  background-color: ${tokens.colorNeutralBackground1};
  `