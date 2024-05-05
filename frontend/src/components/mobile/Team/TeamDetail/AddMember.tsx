/** @jsxImportSource @emotion/react */

import Flex from '@/components/shared/Flex'
import LargeButton from '@/components/shared/LargeButton'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import { tokens } from '@fluentui/react-components'
import MemberThumbnail from '@/components/mobile/Team/MemberThumbnail'
import Text from '@shared/Text'
import { useState } from 'react'
import { UserListType, UserType } from '@/types/userType'
import { BooleanStateType } from '@/types/commonType'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import BackArrow from '@/components/shared/BackArrow'
import SearchBox from '@/components/shared/SearchBox'
import { TeamListType } from '@/types/TeamListType'

const AddMember = ({
  team,
  state,
}: {
  team: TeamListType
  state: BooleanStateType
}) => {
  const [teamSearchValue, setTeamSearchValue] = useState('')
  const [SearchResults, setSearchResults] = useState<UserType[]>([])
  const [selectedMember, setSelectedMember] = useState<UserType[]>([])
  const { value, setValue } = state
  const isWrite = value
  const setIsWrite = setValue
  const userId = useRecoilValue(userState).userId

  const handleSearch = () => {}

  const handleMemberCheck = (user: UserType) => {
    if (!selectedMember.some(member => member.userId === user.userId)) {
      setSelectedMember(prev => [...prev, user])
    }
  }
  // 아이콘 버튼에서 선택 해제용으로 사용
  const handleMemberUnCheck = (user: UserType) => {
    setSelectedMember(prev =>
      prev.filter(member => member.userId !== user.userId),
    )
  }
  // 선택 확인
  const isMember = (user: UserType) => {
    return selectedMember.some(member => member.userId === user.userId)
  }

  const handleBackArrow = () => {
    setIsWrite(!isWrite)
  }

  const handleResult = (data: UserListType) => {
    if (data) {
      setSearchResults(data)
    }
  }
  return (
    <>
    <div css={css`height:100vh;`}>
      <BackArrow onClick={handleBackArrow} />
      <Flex
        direction="column"
        justify="space-around"
        align="center"
        css={Step1mainContainerCss}
      >
        {/* step 2*/}
        <Flex direction="column" align="flex-start" style={{ width: '100%' }}>
          <Text typography="t6" bold={true}>
            {team.teamName}에 구성원 추가
          </Text>
          <Spacing size={20} direction="vertical" />
          <Text bold={true} typography="t8">
            팀원으로 추가할 사람을 선택해주세요.
          </Text>
          <Spacing size={20} direction="vertical" />
          <Flex direction="row" align="center" justify="center" css={searchCss}>
            <SearchBox
              onSearch={handleResult} // 검색 로직 넣기
              value={teamSearchValue}
              isSearchingMember={true}
              onChange={(e: any) => {
                if (e.target.value !== undefined ) {
                  setTeamSearchValue(e.target.value)
                }
                if (e.target.value === undefined || e.target.value === '') {
                  setTeamSearchValue('')
                  setSearchResults([])
                }
              }}
              lefticon={false}
              bgColor="colorNeutralBackground3"
              memberIcon={false}
              filterIcon={false}
              sortIcon={false}
              width="70vw"
            />
            <LargeButton text="검색" onClick={handleSearch} width="10vw" />
          </Flex>
          <Spacing size={20} direction="vertical" />
          {SearchResults === undefined || SearchResults.length > 0 ? (
            SearchResults.map(user => {
              if (user.userId !== userId) {
                return (
                  <MemberThumbnail
                    user={user}
                    onClick={e => {
                      e.stopPropagation()
                      handleMemberCheck(user)
                    }}
                    isSelected={isMember(user)}
                  />
                )
              } else {
                return <></>
              }
            })
          ) : (
            <>
              <Text typography="t8" bold={true}>
                선택된 구성원
              </Text>
              {selectedMember.map(user => {
                return (
                  <MemberThumbnail
                    user={user}
                    onIconClick={e => {
                      e.stopPropagation()
                      handleMemberUnCheck(user)
                    }}
                    isSelected={isMember(user)}
                  />
                )
              })}
            </>
          )}
        </Flex>

        <Spacing size={20} direction="horizontal" />
      </Flex>
    </div>
      <div css={addMemberbtn}>
        {selectedMember.length > 0 ? (
            <LargeButton text="완료" width="35vw" onClick={() => {}} />
        ) : (
            <LargeButton
              text="완료"
              width="35vw"
              disabled={true}
              onClick={() => console.log('팀 추가 -멤버 포함 : 수정하기')}
            />
        )}
      </div>
      </>
  )
}

export default AddMember

const addMemberbtn = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: ${tokens.colorNeutralBackground1};
  border-top: 1px solid ${tokens.colorNeutralBackground2};
`



const Step1mainContainerCss = css`
  margin-top: 2vh;
  padding-left: 5%;
  height: 40vh;
  padding-bottom: 10vh;
  padding-right: 5vw;
  .step1-enter {
    animation: fadeIn 1s;
  }

  .step1-exit {
    animation: fadeOut 1s;
  }

  .step2-enter {
    animation: fadeIn 2s;
  }

  .step2-exit {
    animation: fadeOut 0.5s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const searchCss = css`
  margin-left: -5%;
`
