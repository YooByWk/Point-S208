/** @jsxImportSource @emotion/react */
import { dummyTeamList } from '@/assets/data/dummyTeamList'
import Spacing from '@/components/shared/Spacing'
import TeamCard from '@/components/mobile/Team/TeamCard'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import * as teamState from '@/stores/team'
import LargeModal from '@/components/shared/LargeModal'
import { css } from '@emotion/react'
import Text from '@shared/Text'
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
      <div css={buttonCss}>
        <LargeModal 
          buttonText="팀 추가"
          dialogTitle="팀 추가"
          height='60vh'
          dialogContent= {(<>
          <Text typography='t9'>팀원을 추가하려면 팀원의 이름 또는 전자 메일을 입력하세요.</Text>
          
          <SearchBox 
            value = '팀원 검색 컴포로 변경해야 함'
            placeholder='이름 또는 전자 메일 입력'
            memberIcon={false}
            filterIcon={false}
            sortIcon={false}
            width='100%'
          />
          </>)}
          
          /* */
          onClick={() => console.log('팀 추가')}
          actionButtonText='추가'
          btnWidth='80%'
        />
        </div>
    </div>
  )
}

export default TeamList
const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 10;
  z-index: 999;
  background-color: transparent;
  `