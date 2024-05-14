import useWindowSize from '@/hooks/useWindowSize'
import styled from '@emotion/styled'
import { tokens } from '@fluentui/react-components'
import { Add48Filled } from '@fluentui/react-icons'
import { useMemo, useState } from 'react'
import WebTeamCard from './WebTeamCard'
import { useSetRecoilState } from 'recoil'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { TeamListType } from '@/types/TeamListType'
import { BooleanStateType } from '@/types/commonType'
import Modal from '@/components/shared/Modal'
import WebTeamEdit from './WebTeamEdit'
import { colors } from '@/styles/colorPalette'

type WebTeamListType = {
  data: TeamListType[]
  isEdit: boolean
} & BooleanStateType

const WebTeamList = (props: WebTeamListType) => {
  const { data, setValue, isEdit } = props
  const setSelectedTeamId = useSetRecoilState(selectedTeamAlbumIdState)
  const [isOpen, setIsOpen] = useState(false)
  const [editSelectedTeam, setEditSelectedTeam] = useState<
    TeamListType | undefined
  >()

  const width = useWindowSize() - 390 - 17

  const marginInline = useMemo(() => {
    let baseMargin = width % 440
    if (data.length * 440 < width) {
      baseMargin = width - data.length * 440
    }
    return baseMargin / 2
  }, [width, data.length])

  return (
    <>
      <Container $marginInline={marginInline}>
        {data.map(item => (
          <Box
            key={item.teamAlbumId}
            $isAdd={false}
            $isEdit={isEdit}
            onClick={() => {
              setEditSelectedTeam(item)
              isEdit ? setIsOpen(true) : setSelectedTeamId(item)
            }}
          >
            <WebTeamCard item={item} />
          </Box>
        ))}
        <Box onClick={() => setValue(true)} $isAdd={true} $isEdit={false}>
          <Add48Filled />
        </Box>
      </Container>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <WebTeamEdit team={editSelectedTeam} data={data} />
        </Modal>
      )}
    </>
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

const Box = styled.div<{ $isAdd: boolean; $isEdit: boolean }>`
  display: flex;
  justify-content: ${props => (props.$isAdd ? 'center' : 'space-between')};
  align-items: center;
  width: 390px;
  height: 215px;
  background-color: ${tokens.colorNeutralBackground4};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;

  @keyframes borderBlink {
    0% {
      border-color: ${colors.themeText};
    }
    50% {
      border-color: transparent;
    }
    100% {
      border-color: ${colors.themeText};
    }
  }
  border: ${props =>
    props.$isEdit ? `1px solid ${colors.themeText}` : 'none'};
  animation: ${props => (props.$isEdit ? 'borderBlink 2s infinite' : 'none')};
`
