/** @jsxImportSource @emotion/react */
import { ArrowLeft24Regular } from '@fluentui/react-icons'
import { useEffect, useState } from 'react'
import Text from '@shared/Text'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import { Input as FluentInput, tokens } from '@fluentui/react-components'
import { UserListType, UserType } from '@/types/userType'
import MemberThumbnail from './MemberThumbnail'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useTeamCreatgeSkip } from '@/hooks/Team/useTeamCreateSkip'
import { useCreateTeam } from '@/hooks/useCreateTeam'
import { TeamListType } from '@/types/TeamListType'

interface AddTeamProps {
  setIsWrite: (isWrite: boolean) => void
  isWrite: boolean
  data: TeamListType[]
}

const AddTeam = ({ setIsWrite, isWrite, data }: AddTeamProps) => {
  const userId = useRecoilValue(userState).userId
  const [step, setStep] = useState(1)
  const [teamName, setTeamName] = useState('')
  const [teamSearchValue, setTeamSearchValue] = useState('')
  const [SearchResults, setSearchResults] = useState<UserType[]>([])
  const [selectedMember, setSelectedMember] = useState<UserType[]>([])

  const skipMutation = useTeamCreatgeSkip()
  const createTeamMutation = useCreateTeam()
  const handleResult = (data: UserListType) => {
    if (data) {
      setSearchResults(data)
    }
  }

  const handleTeamNameInput = (e: any) => {
    setTeamName(e.target.value)
  }

  const handleBackArrow = () => {
    if (step === 1) {
      setIsWrite(!isWrite)
    } else {
      setStep(step - 1)
    }
  }

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

  const handleSkipClick = () => {
    skipMutation.mutate(teamName)
    setIsWrite(!isWrite)
  }

  const handleCreateTeam = () => {
    const userList: number[] = selectedMember
      .map(member => member.userId)
      .filter((id): id is number => id !== undefined)
    setIsWrite(!isWrite)
    if (!userList || userList.length === 0) return
    createTeamMutation.mutate({ teamName, userList })
  }

  // 에러 처리
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const isName = data.some(item => item.teamName === teamName)

    if (isName) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [data, teamName])

  return (
    <div css={Step1mainContainerCss}>
      <Flex direction="row" onClick={handleBackArrow} css={arrowContainer}>
        <ArrowLeft24Regular />
        <Spacing size={10} direction="horizontal" />
        <Text typography="t7">뒤로가기</Text>
      </Flex>
      <Spacing size={10} />
      {step === 1 ? (
        <div className={step === 1 ? 'step1-enter' : 'step1-exit'}>
          <Flex direction="column" justify="space-around" align="center">
            {/* step 1*/}
            <Flex
              direction="column"
              align="flex-start"
              style={{ width: '100%' }}
            >
              <Text typography="t6" bold={true}>
                팀 이름 설정
              </Text>
              <Spacing size={20} direction="vertical" />
              <FluentInput
                placeholder={
                  teamName.length > 0 ? teamName : '팀 이름을 입력해주세요'
                }
                appearance="filled-lighter"
                size="large"
                onChange={handleTeamNameInput}
                css={inputCss}
              />
            </Flex>
            <Spacing size={20} direction="vertical" />
            <Flex css={btnContainer} justify="space-between">
              <LargeButton
                text="취소"
                secondary={true}
                width="35vw"
                onClick={() => setIsWrite(!isWrite)}
              />
              <Spacing size={20} direction="horizontal" />
              <LargeButton
                text="다음"
                width="35vw"
                onClick={() => {
                  setStep(2)
                }}
                disabled={!teamName.length || isError}
              />
            </Flex>
          </Flex>
          {isError && (
            <>
              <Spacing size={20} direction="vertical" />
              <Text typography="t9" className="red">
                이미 해당 팀이 존재합니다.
                <br />팀 이름을 다시 입력해 주세요
              </Text>
            </>
          )}
        </div>
      ) : (
        <div className={step === 2 ? 'step2-enter' : 'step2-exit'}>
          <Flex
            direction="column"
            justify="space-around"
            align="center"
            css={Step1mainContainerCss}
          >
            {/* step 2*/}
            <Flex
              direction="column"
              align="flex-start"
              style={{ width: '100%' }}
            >
              <Text typography="t6" bold={true}>
                {teamName}에 구성원 추가
              </Text>
              <Spacing size={20} direction="vertical" />
              <Text bold={true} typography="t8">
                팀원으로 추가할 사람을 선택해주세요.
              </Text>
              <Spacing size={20} direction="vertical" />
              <Flex
                direction="row"
                align="center"
                justify="center"
                css={searchCss}
              >
                <SearchBox
                  onSearch={handleResult}
                  value={teamSearchValue}
                  isSearchingMember={true}
                  onChange={(e: any) => {
                    if (e.target.value !== undefined) {
                      setTeamSearchValue(e.target.value)
                    }
                    if (e.target.value === undefined) {
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
                <LargeButton
                  typography="t8"
                  text="검색"
                  onClick={handleSearch}
                  width="15vw"
                />
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

            <Flex css={step2BtnContainer} justify="flex-end">
              <LargeButton
                text="건너뛰기"
                secondary={true}
                width="35vw"
                onClick={handleSkipClick}
              />
              <Spacing size={20} direction="horizontal" />
              {selectedMember.length > 0 ? (
                <LargeButton
                  text="완료"
                  width="35vw"
                  onClick={handleCreateTeam}
                />
              ) : (
                <LargeButton
                  text="완료"
                  width="35vw"
                  disabled={true}
                  onClick={() => {}}
                />
              )}
            </Flex>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default AddTeam

const btnContainer = css`
  width: 100%;
`
const inputCss = css`
  width: 100%;
  font-size: 16px !important;
  background-color: ${tokens.colorNeutralBackground1Hover} !important;
`

const Step1mainContainerCss = css`
  margin-top: 2vh;
  padding-inline: 5%;
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

  .red {
    color: #d13448;
  }
`
const arrowContainer = css`
  width: fit-content;
`

const step2BtnContainer = css`
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: ${tokens.colorNeutralBackground1};
`

const searchCss = css`
  margin-left: -5%;
`
