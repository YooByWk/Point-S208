import styled from '@emotion/styled'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import { useState } from 'react'
import InfoEdit from './InfoEdit'

const MyCardDetail = () => {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      {editOpen ? (
        <InfoEdit value={editOpen} setValue={setEditOpen} />
      ) : (
        <Container>
          <CardSection />
          <InfoSection value={editOpen} setValue={setEditOpen} />
        </Container>
      )}
    </>
  )
}

export default MyCardDetail

// style

const Container = styled.div`
  height: 100vh;
`
