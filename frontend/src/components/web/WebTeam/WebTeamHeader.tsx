/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import styled from '@emotion/styled'
import { SearchBox } from '@fluentui/react-components'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Filter32Regular, ArrowSort28Regular } from '@fluentui/react-icons'
import { BooleanStateType } from '@/types/commonType'
import { TeamListType } from '@/types/TeamListType'

type WebTeamHeaderType = {
  data: TeamListType[]
  setSearchTeamList: Dispatch<SetStateAction<TeamListType[]>>
} & BooleanStateType

const WebTeamHeader = (props: WebTeamHeaderType) => {
  const { data, setSearchTeamList, setValue } = props
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
      <Filter32Regular />
      <ArrowSort28Regular />
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
