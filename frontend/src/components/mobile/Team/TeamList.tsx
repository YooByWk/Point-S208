/** @jsxImportSource @emotion/react */
import Spacing from '@/components/shared/Spacing'
import TeamCard from '@/components/mobile/Team/TeamCard'
import TeamListSearchBox from '@/components/mobile/Team/TeamList/TeamListSearchBox'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import * as teamState from '@/stores/team'
import { css } from '@emotion/react'
import LargeButton from '@/components/shared/LargeButton'
import AddTeam from '@/components/mobile/Team/AddTeam'
import { Spinner, tokens } from '@fluentui/react-components'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamList } from '@/apis/team'
import { userState } from '@/stores/user'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'
import {
  WindowWrench24Regular,
  WindowWrench24Filled,
} from '@fluentui/react-icons'
import styled from '@emotion/styled'
import Modal from '@/components/shared/Modal'
import AppTeamEdit from './AppTeamEdit'

const TeamList = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isWrite, setIsWrite] = useState(false)
  const setSelectedTeam = useSetRecoilState(teamState.selectedTeamAlbumIdState)
  const navigate = useNavigate()
  const userId = useRecoilValue(userState).userId

  const [searchResults, setSearchResults] = useState<TeamListType[]>([])
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchTeamList', userId],
    queryFn: () => fetchTeamList(userId as number),
  })
  const teamList: TeamListType[] = data || []

  // 팀 편집모드
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editSelectedTeam, setEditSelectedTeam] = useState<
    TeamListType | undefined
  >()

  if (isLoading) {
    return <Spinner label="로딩 중..." style={{ height: '100vh' }} />
  }

  if (isWrite) {
    return <AddTeam isWrite={isWrite} setIsWrite={setIsWrite} />
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
        <LargeButton text="팀 추가" onClick={() => setIsWrite(!isWrite)} />
      </Flex>
    )
  }

  return (
    <>
      <Flex justify="space-between">
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
        <Icon onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? <WindowWrench24Filled /> : <WindowWrench24Regular />}
          <Text typography="t8">{isEdit ? '완료' : '편집'}</Text>
        </Icon>
      </Flex>
      <Spacing size={30} />
      {searchResults.map(team => (
        <TeamCard
          teamInfo={team}
          isEdit={isEdit}
          key={team.teamAlbumId}
          onClick={() => {
            setEditSelectedTeam(team)
            if (isEdit) {
              setIsOpen(true)
            } else {
              setSelectedTeam(team)
              navigate(`/myTeam/${team.teamAlbumId}`, { state: team })
            }
          }}
        />
      ))}
      <Spacing size={30} direction="vertical" />
      <div css={buttonCss}>
        <LargeButton
          text="팀 추가"
          width="80%"
          onClick={() => setIsWrite(true)}
        />
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <AppTeamEdit
            team={editSelectedTeam}
            data={data}
            refetch={refetch}
            setIsOpen={setIsOpen}
          />
        </Modal>
      )}
    </>
  )
}

export default TeamList

// css

const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 0vh;
  z-index: 999;
  background-color: ${tokens.colorNeutralBackground1};
`

// style

const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
  cursor: pointer;
  white-space: nowrap;
`
