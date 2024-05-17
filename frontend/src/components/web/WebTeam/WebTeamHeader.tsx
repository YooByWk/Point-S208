/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import styled from '@emotion/styled'
import { SearchBox } from '@fluentui/react-components'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  WindowWrench32Regular,
  WindowWrench32Filled,
} from '@fluentui/react-icons'
import { BooleanStateType } from '@/types/commonType'
import { TeamListType } from '@/types/TeamListType'
import Text from '@/components/shared/Text'

type WebTeamHeaderType = {
  data: TeamListType[]
  setSearchTeamList: Dispatch<SetStateAction<TeamListType[]>>
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
} & BooleanStateType

const WebTeamHeader = (props: WebTeamHeaderType) => {
  const { data, setSearchTeamList, setValue, isEdit, setIsEdit } = props
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword === undefined) {
      setKeyword('')
      return
    }
    if (keyword.toString().trim().length > 0) {
      const results = data.filter(team =>
        team.teamName.toLowerCase().includes(keyword.toString().toLowerCase()),
      )
      setSearchTeamList(results)
    } else {
      setSearchTeamList(data)
    }
  }, [data, keyword, setSearchTeamList])

  return (
    <Container>
      <SearchBox
        placeholder="팀 이름을 검색해 주세요"
        appearance="underline"
        onChange={(e: any) => setKeyword(e.target.value)}
      />
      <LargeButton text="팀 추가" width="20vw" onClick={() => setValue(true)} />
      <Icon onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? <WindowWrench32Filled /> : <WindowWrench32Regular />}
        <Text typography="t7">{isEdit ? '편집모드' : '일반모드'}</Text>
      </Icon>
    </Container>
  )
}

export default WebTeamHeader

// style

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  margin: 20px 40px;

  button > span {
    font-size: 16px;
  }
`

const Icon = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`
