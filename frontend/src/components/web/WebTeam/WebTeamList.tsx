import useWindowSize from '@/hooks/useWindowSize'
import styled from '@emotion/styled'
import { tokens } from '@fluentui/react-components'
import { Add48Filled } from '@fluentui/react-icons'
import { useMemo } from 'react'
import WebTeamCard from './WebTeamCard'
import { dummyTeamList } from '@/assets/data/dummyTeamList'
import { useSetRecoilState } from 'recoil'
import { selectedTeamIdState } from '@/stores/team'

const WebTeamList = () => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdState)
  const width = useWindowSize() - 390 - 17
  const teamList = dummyTeamList

  const marginInline = useMemo(() => {
    let baseMargin = width % 440
    if (teamList.length * 440 < width) {
      baseMargin = width - teamList.length * 440
    }
    return baseMargin / 2
  }, [width, teamList.length])

  return (
    <Container $marginInline={marginInline}>
      {teamList.map((item, idx) => (
        <Box key={idx} $isAdd={false} onClick={() => setSelectedTeamId(item)}>
          <WebTeamCard item={item} />
        </Box>
      ))}
      <Box onClick={() => {}} $isAdd={true}>
        <Add48Filled />
      </Box>
    </Container>
  )
}

export default WebTeamList

// style

const Container = styled.div<{ $marginInline: number }>`
  display: flex;
  flex-wrap: wrap;
  margin: 20px ${props => props.$marginInline}px;
  gap: 50px;
`

const Box = styled.div<{ $isAdd: boolean }>`
  display: flex;
  justify-content: ${props => (props.$isAdd ? 'center' : 'space-between')};
  align-items: center;
  width: 390px;
  height: 215px;
  background-color: ${tokens.colorNeutralBackground4};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
`
