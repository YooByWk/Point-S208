import styled from '@emotion/styled'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import { useState } from 'react'
import InfoEdit from './InfoEdit'
import BottomSection from './BottomSection'

const MyCardDetail = () => {
  const [editOpen, setEditOpen] = useState(false)

  const renderContent = () => {
    if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />
    return (
      <Container>
        <CardSection />
        <InfoSection value={editOpen} setValue={setEditOpen} />
        <BottomSection />
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
