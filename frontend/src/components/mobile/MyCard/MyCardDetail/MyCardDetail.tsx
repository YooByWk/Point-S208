import styled from '@emotion/styled'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import { useState } from 'react'
import InfoEdit from './InfoEdit'
import BottomSection from './BottomSection'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'
import OthersCardDetail from './OthersCardDetail'

const MyCardDetail = ({ list }: { list: ExternalCardType[] | CardType[] }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [isDetail, setIsDetail] = useState(false)

  const renderContent = () => {
    if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />
    if (isDetail) return <OthersCardDetail />
    return (
      <Container>
        <CardSection />
        <InfoSection value={editOpen} setValue={setEditOpen} />
        <BottomSection list={list} setIsDetail={setIsDetail} />
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
