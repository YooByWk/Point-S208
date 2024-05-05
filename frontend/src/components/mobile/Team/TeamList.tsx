/** @jsxImportSource @emotion/react */
import { dummyTeamList } from '@/assets/data/dummyTeamList'
import Spacing from '@/components/shared/Spacing'
import TeamCard from '@/components/mobile/Team/TeamCard'
import SearchBox from '@/components/shared/SearchBox'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as teamState from '@/stores/team'
import { css } from '@emotion/react'
import LargeButton from '@/components/shared/LargeButton'
import AddTeam from '@/components/mobile/Team/AddTeam'
import { Spinner, tokens } from '@fluentui/react-components';
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamList } from '@/apis/team'
import { userState } from '@/stores/user'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'


const TeamList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isWrite, setIsWrite] = useState(false)
  const [selectedTeam, setSelectedTeam] = useRecoilState(
    teamState.selectedTeamAlbumIdState,
  )
  const navigate = useNavigate()
  const userId = useRecoilValue(userState).userId
  // 원본
  // const {data,isLoading} = useQuery({
  //   queryKey: ['fetchTeamList', userId],
  //   queryFn: () => fetchTeamList(userId as number),
  // })
  //디버그용
  const {data,isLoading} = useQuery<TeamListType[]>({
    queryKey: ['fetchTeamList', ],
    queryFn: () => fetchTeamList(4),
  })
  const teamList: TeamListType[] = data || []
  console.log(teamList,'리스트')
  if (isLoading) {
    return <Flex direction='column' justify='center' align='center' style={{height:'100vh'}}>
      <Spinner />
      <Text>로딩중...</Text></Flex>
  }
  
  if (isWrite) {
    return (
      <AddTeam 
        isWrite={isWrite}
        setIsWrite={setIsWrite}
      />
    )
  }
  
  if ( !data || data.length === 0 ) {
    return (
      <Flex direction='column' justify='center' align='center' style={{height:'100vh'}}>
        <Text>팀이 없습니다. </Text>
        <Text>팀을 생성해주세요. </Text>
        <Spacing size={20} direction='vertical'></Spacing>
        <LargeButton text='팀 추가' onClick={() => setIsWrite(!isWrite)} />
      </Flex>
    )
  }
  
  
  return (
    <>
    <button onClick={()=>console.log(teamList, data)}>sdfa</button>
      <SearchBox
        onSearch={() => {}}
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          console.log(searchValue, '검색어 확인')
        }}
        memberIcon={false}
        placeholder="팀 검색"
      />
      <Spacing size={30}/>
      {teamList.map(team => (
        <TeamCard
          teamInfo={team}
          key={team.teamAlbumId}
          onClick={() =>  {
            console.log('팀 클릭', team.teamAlbumId)
            setSelectedTeam(team)
            navigate(`/myTeam/${team.teamAlbumId}`)
          }}/>))}
      <Spacing size={30} direction="vertical" />
      <div css={buttonCss}>
        <LargeButton text='팀 추가' width='80%' onClick={() => setIsWrite(true)} />
      </div>
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