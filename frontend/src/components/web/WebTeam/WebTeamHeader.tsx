/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import styled from '@emotion/styled'
import { SearchBox } from '@fluentui/react-components'
import { useState } from 'react'
import { Filter32Regular, ArrowSort28Regular } from '@fluentui/react-icons'
import { BooleanStateType } from '@/types/commonType'

const WebTeamHeader = (props: BooleanStateType) => {
  const { setValue } = props
  const [keyword, setKeyword] = useState('')

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
