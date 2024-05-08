import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import WebTeamNameSection from './WebTeamNameSection'
import WebTeamMemberSection from './WebTeamMemberSection'
import { TeamAddType } from '@/types/TeamListType'
import { UserType } from '@/types/userType'
import { useMutation } from '@tanstack/react-query'
import { CreateTeam, CreateTeamSkip } from '@/apis/team'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'

const Index = (props: TeamAddType) => {
  const { setValue, data, refetch } = props
  const userId = useRecoilValue(userState).userId as number
  const [stage, setStage] = useState(0)
  const [name, setName] = useState('')
  const [member, setMember] = useState<UserType[]>([])

  const { mutate: CreateTeamSkipMutate } = useMutation({
    mutationKey: ['CreateTeamSkip'],
    mutationFn: CreateTeamSkip,
    onSuccess(result) {
      console.log('등록 성공', result)
      refetch()
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const createTeamSkipHandler = async () => {
    let params = {
      userId: userId,
      data: {
        teamName: name,
      },
    }

    CreateTeamSkipMutate(params)
    setStage(-1)
  }

  const { mutate: CreateTeamMutate } = useMutation({
    mutationKey: ['CreateTeam'],
    mutationFn: CreateTeam,
    onSuccess(result) {
      console.log('등록 성공', result)
      refetch()
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const createTeamHandler = () => {
    const userList = member.map(item => item.userId) as number[]
    let params = {
      userId: userId,
      data: {
        teamName: name,
        userList: userList,
      },
    }

    CreateTeamMutate(params)
    setStage(-1)
  }

  useEffect(() => {
    stage < 0 && setValue(false)
  }, [setValue, stage])

  return (
    <Container>
      {stage === 0 && (
        <WebTeamNameSection
          name={name}
          setName={setName}
          setStage={setStage}
          data={data}
        />
      )}
      {stage === 1 && (
        <WebTeamMemberSection
          member={member}
          setMember={setMember}
          setStage={setStage}
          onSkip={createTeamSkipHandler}
          onClick={createTeamHandler}
        />
      )}
    </Container>
  )
}

export default Index

// style

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;

  span,
  input {
    color: #000;
  }

  .red {
    color: red;
  }

  .black {
    color: #000;
  }

  .gray {
    color: #8e9091;
  }
`
