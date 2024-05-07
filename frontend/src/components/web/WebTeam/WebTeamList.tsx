import useWindowSize from '@/hooks/useWindowSize'
import styled from '@emotion/styled'
import { tokens } from '@fluentui/react-components'
import { Add48Filled } from '@fluentui/react-icons'
import { useMemo } from 'react'
import WebTeamCard from './WebTeamCard'
import { useSetRecoilState } from 'recoil'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { TeamListType } from '@/types/TeamListType'
import { BooleanStateType } from '@/types/commonType'

type WebTeamListType = {
  data: TeamListType[]
} & BooleanStateType

const WebTeamList = (props: WebTeamListType) => {
  const { data, setValue } = props
  const setSelectedTeamId = useSetRecoilState(selectedTeamAlbumIdState)
  const width = useWindowSize() - 390 - 17

  const marginInline = useMemo(() => {
    let baseMargin = width % 440
    if (data.length * 440 < width) {
      baseMargin = width - data.length * 440
    }
    return baseMargin / 2
  }, [width, data.length])

  return (
    <Container $marginInline={marginInline}>
      {data.map(item => (
        <Box
          key={item.teamAlbumId}
          $isAdd={false}
          onClick={() => setSelectedTeamId(item)}
        >
          <WebTeamCard item={item} />
        </Box>
      ))}
      <Box onClick={() => setValue(true)} $isAdd={true}>
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
