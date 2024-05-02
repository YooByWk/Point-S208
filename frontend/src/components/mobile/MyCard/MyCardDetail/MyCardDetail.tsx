import styled from '@emotion/styled'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import { useState } from 'react'
import InfoEdit from './InfoEdit'
import BottomSection from './BottomSection'
import PhotoAddReg from '../PhotoCardInfo/PhotoAddReg'
import { useRecoilValue } from 'recoil'
import { isFrontState } from '@/stores/card'

const MyCardDetail = () => {
  const isFront = useRecoilValue(isFrontState)
  const [editOpen, setEditOpen] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)

  const renderContent = () => {
    if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />
    if (cameraOpen) return <PhotoAddReg isFront={isFront} value={cameraOpen} setValue={setCameraOpen} />
    return (
      <Container>
        <CardSection />
        <InfoSection value={editOpen} setValue={setEditOpen} />
        <BottomSection value={cameraOpen} setValue={setCameraOpen} />
      </Container>
    )
  }

  return <>{renderContent()}</>
}

export default MyCardDetail

// style

const Container = styled.div`
  height: 100vh;
`
