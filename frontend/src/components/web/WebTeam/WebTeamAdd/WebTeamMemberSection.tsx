/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TeamMemberType } from '@/types/TeamListType'
import Flex from '@/components/shared/Flex'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import { Badge, Button, SearchBox } from '@fluentui/react-components'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchUser } from '@/apis/team'
import { KeyboardEvent } from 'react'
import styled from '@emotion/styled'
import { UserType } from '@/types/userType'
import { Add20Filled, Dismiss20Filled } from '@fluentui/react-icons'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'

const WebTeamMemberSection = ({
  member,
  setMember,
  setStage,
  onSkip,
  onClick,
}: TeamMemberType) => {
  const userId = useRecoilValue(userState).userId
  const [keyword, setKeyword] = useState('')

  const { data, refetch } = useQuery({
    queryKey: ['searchUser', keyword],
    queryFn: context => searchUser(context.queryKey[1]),
    enabled: false,
  })

  const onKeyDownHandler = (e: KeyboardEvent<Element>) => {
    if (e.key === 'Enter') {
      refetch()
    }
  }

  const addMemberHandler = (item: UserType) => {
    if (item.userId === userId) return

    const isDuplicate = member.some(m => m.userId === item.userId)

    if (!isDuplicate) {
      setMember(prev => [...prev, item])
    }
  }

  const deleteMemberHandler = (item: UserType) => {
    setMember(prev => prev.filter(m => m.userId !== item.userId))
  }

  return (
    <Flex direction="column" justify="space-between">
      <Text typography="t8" bold={true}>
        팀 멤버 추가하기
      </Text>

      <Spacing size={20} />

      <SearchBox
        placeholder="멤버를 검색해 주세요"
        appearance="underline"
        onChange={(e: any) => setKeyword(e.target.value)}
        onKeyDown={onKeyDownHandler}
      />

      <Spacing size={20} />

      <Result
        $showScrollbar={data && data.length > 3}
        $isMember={false}
        $len={0}
      >
        {data && data[0] !== undefined ? (
          data.map((item: UserType) => (
            <Flex
              key={item.userId}
              className="black"
              align="center"
              justify="space-between"
            >
              <Flex align="center">
                <LastNameCircle $num={(item.userId as number) % 10}>
                  {item.name[0]}
                </LastNameCircle>
                <Spacing size={10} direction="horizontal" />
                <Flex direction="column">
                  <Text typography="t9">{item.name}</Text>
                  <Text typography="t9">{item.email}</Text>
                </Flex>
              </Flex>
              <Add20Filled
                onClick={() => addMemberHandler(item)}
                css={buttonStyle}
              />
            </Flex>
          ))
        ) : (
          <Text typography="t9" className="gray">
            검색 결과가 없습니다.
          </Text>
        )}
      </Result>

      <Spacing size={20} />

      <Flex align="center">
        <Text typography="t8">▶ 팀 추가 멤버</Text>
        <Spacing size={10} direction="horizontal" />
        {member.length > 0 && (
          <Badge appearance="filled" color="brand">
            {member.length}
          </Badge>
        )}
      </Flex>

      <Spacing size={20} />

      <Result
        $showScrollbar={
          member.length < 4
            ? false
            : data
            ? member.length + data.length > 6
            : member.length > 5
        }
        $isMember={true}
        $len={data && data.length > 2 ? 0 : data && data.length === 2 ? 1 : 2}
      >
        {member.length ? (
          member.map((item: UserType) => (
            <Flex
              key={item.userId}
              className="black"
              align="center"
              justify="space-between"
            >
              <Flex align="center">
                <LastNameCircle $num={(item.userId as number) % 10}>
                  {item.name[0]}
                </LastNameCircle>
                <Spacing size={10} direction="horizontal" />
                <Flex direction="column">
                  <Text typography="t9">{item.name}</Text>
                  <Text typography="t9">{item.email}</Text>
                </Flex>
              </Flex>
              <Dismiss20Filled
                onClick={() => deleteMemberHandler(item)}
                css={buttonStyle}
              />
            </Flex>
          ))
        ) : (
          <Text typography="t9" className="gray">
            멤버를 추가해주세요
          </Text>
        )}
      </Result>

      <Flex justify="space-between" css={bottomStyle}>
        <Button shape="circular" onClick={() => setStage(0)}>
          이전
        </Button>
        <Button
          shape="circular"
          onClick={onSkip}
          disabled={member.length !== 0}
        >
          건너뛰기
        </Button>
        <Button
          shape="circular"
          onClick={onClick}
          disabled={member.length === 0}
        >
          생성
        </Button>
      </Flex>
    </Flex>
  )
}

export default WebTeamMemberSection

// style

const Result = styled.div<{
  $showScrollbar: boolean
  $isMember: boolean
  $len: number
}>`
  max-height: ${props =>
    props.$isMember ? `${120 + props.$len * 40}px` : '120px'};
  overflow-y: scroll;
  ${props =>
    !props.$showScrollbar &&
    `
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `}
`

const CircleColors = [
  '#eba0a0',
  '#e59661',
  '#ffff00',
  '#edffd6',
  '#adff2f',
  '#add8e6',
  '#9898fc',
  '#f495eb',
  '#e7e5e5',
  '#aaadc5',
]

const LastNameCircle = styled.div<{ $num: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => CircleColors[props.$num]};
`

// css

const bottomStyle = css`
  position: absolute;
  bottom: 30px;
  width: 440px;
`

const buttonStyle = css`
  margin-right: 10px;
  cursor: pointer;
`
