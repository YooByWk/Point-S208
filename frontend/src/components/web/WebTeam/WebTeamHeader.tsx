/** @jsxImportSource @emotion/react */
import LargeButton from '@/components/shared/LargeButton'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { SearchBox } from '@fluentui/react-components'
import { useState } from 'react'
import { Filter32Regular, ArrowSort28Regular } from '@fluentui/react-icons'

const WebTeamHeader = () => {
  const [keyword, setKeyword] = useState('')

  return (
    <Container>
      <SearchBox
        placeholder="팀 이름을 검색해 주세요"
        onChange={(e: any) => setKeyword(e.target.value)}
        css={searchBoxStyle}
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
  margin: 20px;
`

// css

const searchBoxStyle = css`
  border: none;
`
