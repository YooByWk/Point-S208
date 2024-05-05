/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { SearchBox } from '@fluentui/react-components'
import { useState } from 'react'
import { Filter32Regular, ArrowSort28Regular } from '@fluentui/react-icons'

const WebTeamHeader = () => {
  const [value, setValue] = useState('')
  console.log(value)

  return (
    <Container>
      <SearchBox
        placeholder="팀 이름을 검색해 주세요"
        appearance="underline"
        onChange={(e: any) => setValue(e.target.value)}
      />
      <LargeButton text="팀 추가" width="20vw" onClick={() => {}} />
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
