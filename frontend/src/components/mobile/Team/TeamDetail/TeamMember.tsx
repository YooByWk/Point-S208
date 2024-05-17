/** @jsxImportSource @emotion/react */
import Text from '@shared/Text'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import { tokens } from '@fluentui/react-components'
import { isLookingMemberState } from '@/stores/team'
import { Person48Filled } from '@fluentui/react-icons'
import Spacing from '@/components/shared/Spacing'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardType } from '@/types/cardType'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamMember } from '@/apis/team'
import BackArrow from '@/components/shared/BackArrow'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'
import { TeamListType } from '@/types/TeamListType'
import AddMember from './AddMember'

const MemberComponent = (member: CardType) => {
  return (
    <>
      <Flex direction="row" justify="flex-start" align="center" css={container}>
        <Person48Filled />
        <Spacing size={20} direction="horizontal" />
        <Flex direction="column" justify="left" align="start">
          <Text>{member.name}</Text>
          <Text typography="t9">{member.email}</Text>
        </Flex>
      </Flex>
      <hr />
    </>
  )
}

const TeamMember = ({ team }: { team: TeamListType }) => {
  const [isLookingMember, setIsLookingMember] =
    useRecoilState(isLookingMemberState)

  const params = useParams().teamAlbumId
  const teamAlbumId = Number(params)
  const userId = useRecoilValue(userState).userId
  const { data, isLoading } = useQuery({
    queryKey: ['fetchTeamMember', userId],
    queryFn: () => fetchTeamMember(teamAlbumId, userId as number),
  })
  const teamMember: CardType[] = data?.data_body || []
  const handleBackArrow = () => {
    setIsLookingMember(!isLookingMember)
  }

  const [searchValue, setSearchValue] = useState('')

  const filteredMembers =
    Array.isArray(teamMember) && !isLoading
      ? teamMember.filter(
          member =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            member.email.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : []

  const [addingMember, setAddingMember] = useState(false)

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !addingMember ? (
        <>
          <BackArrow onClick={handleBackArrow} />
          <SearchBox
            value={searchValue}
            onSearch={() => {}}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="이름 혹은 이메일로 검색"
            filterIcon={false}
            sortIcon={false}
          />
          <Spacing size={15} direction="vertical" />
          <div style={{ marginBottom: '81px' }}>
            {filteredMembers.map(member => {
              return <MemberComponent {...member} />
            })}
          </div>
          <div css={btn}>
            <LargeButton
              text="팀원 추가"
              width="80%"
              onClick={() => {
                setAddingMember(true)
              }}
            />
          </div>
        </>
      ) : (
        <AddMember
          team={team}
          state={{ value: addingMember, setValue: setAddingMember }}
        />
      )}
    </div>
  )
}

export default TeamMember

const container = css`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${tokens.colorNeutralBackground2};
  cursor: pointer;
  &:hover {
    background-color: ${tokens.colorNeutralBackground2Hover};
  }
`

const btn = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: ${tokens.colorNeutralBackground1};
  border-top: 1px solid ${tokens.colorNeutralBackground2};
`
