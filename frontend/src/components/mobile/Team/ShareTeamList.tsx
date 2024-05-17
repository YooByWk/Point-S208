/** @jsxImportSource @emotion/react */
import Spacing from '@/components/shared/Spacing'
import TeamListSearchBox from '@/components/mobile/Team/TeamList/TeamListSearchBox'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as teamState from '@/stores/team'
import { css } from '@emotion/react'
import LargeButton from '@/components/shared/LargeButton'
import { Spinner, tokens } from '@fluentui/react-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTeamList } from '@/apis/team'
import { userState } from '@/stores/user'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'
import ShareTeamCard from './ShareTeamCard'
import { shareToTeamCard } from '@/apis/album'
import {
  CheckmarkCircle24Regular,
  Circle24Regular,
} from '@fluentui/react-icons'

const TeamList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isWrite, setIsWrite] = useState(false)
  const [selectedTeam, setSelectedTeam] = useRecoilState(
    teamState.selectedTeamAlbumIdState,
  )
  const navigate = useNavigate()
  const userId = useRecoilValue(userState).userId
  const [searchResults, setSearchResults] = useState<TeamListType[]>([])
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['fetchTeamList', userId],
    queryFn: () => fetchTeamList(userId as number),
  })
  const teamList: TeamListType[] = data || []

  const param = useLocation()
  if (isLoading) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ height: '100vh' }}
      >
        <Spinner />
        <Text>로딩중...</Text>
      </Flex>
    )
  }
  const handleShareClick = async () => {
    shareToTeamCard(
      userId as number,
      selectedTeam.teamAlbumId,
      param.state.selectedCards,
    )
    await queryClient.invalidateQueries({ queryKey: ['fetchTeamCardsList'] })
    navigate(`/myAlbum`, { state: { isShare: false } })
    alert('명함을 팀에 공유했습니다')
  }

  if (!data || data.length === 0) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ height: '100vh' }}
      >
        <Text>팀이 없습니다. </Text>
        <Text>팀을 생성해주세요. </Text>
        <Spacing size={20} direction="vertical"></Spacing>
        <LargeButton text="팀 선택" onClick={() => setIsWrite(!isWrite)} />
      </Flex>
    )
  }

  return (
    <>
      <TeamListSearchBox
        teams={teamList}
        searchResult={searchResults}
        setSearchResult={setSearchResults}
        value={searchValue}
        setSearchValue={setSearchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
        }}
        placeholder="팀 검색"
      />
      <Spacing size={30} />
      {searchResults.map(team => (
        <div
          key={team.teamAlbumId}
          onClick={() => setSelectedTeam(team)}
          css={iconCont}
        >
          <ShareTeamCard teamInfo={team} />
          {selectedTeam.teamAlbumId === team.teamAlbumId ? (
            <CheckmarkCircle24Regular css={iconCss} />
          ) : (
            <Circle24Regular css={iconCss} />
          )}
        </div>
      ))}
      <Spacing size={30} direction="vertical" />
      <div css={buttonCss}>
        <LargeButton
          text="팀에 공유하기"
          width="80%"
          onClick={handleShareClick}
        />
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

const iconCont = css`
  position: relative;
`

const iconCss = css`
  position: absolute;
  top: 0;
  right: 10%;
`
