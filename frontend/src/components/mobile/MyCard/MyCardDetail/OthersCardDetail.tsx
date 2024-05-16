/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import DetailInfoSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailSection'
import DetailInfoEdit from '@components/mobile/MyAlbum/MyAlbumDetail/DetailInfoEdit'
import DetailCardSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailCardSection'
import DetailBottomSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailBottomSection'
import styled from '@emotion/styled'
import BackArrow from '@/components/shared/BackArrow'
import DetailMapSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailMapSection'
import MemoSection from '@components/mobile/MyAlbum/MyAlbumDetail/MemoSection'
import { useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'
import Spacing from '@/components/shared/Spacing'

interface OthersCardDetailProps {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const OthersCardDetail = ({ setIsDetail }: OthersCardDetailProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isReal, setIsReal] = useState(true)
  const selectedCard = useRecoilValue(selectedCardState)

  const renderContent = () => {
    if (isEdit)
      return (
        <DetailInfoEdit
          isEdit={{ value: isEdit, setValue: setIsEdit }}
          card={selectedCard}
        />
      )

    const handleBack = () => {
      setIsDetail(false)
    }

    return (
      <Container>
        <BackArrow onClick={handleBack} />
        <Spacing size={20} />
        <DetailCardSection
          isRealState={{ value: isReal, setValue: setIsReal }}
          card={selectedCard}
        />
        <DetailInfoSection
          card={selectedCard}
          isEdit={{ value: isEdit, setValue: setIsEdit }}
        />
        <DetailMapSection card={selectedCard} />
        <DetailBottomSection card={selectedCard} />
        <MemoSection card={selectedCard} />
      </Container>
    )
  }
  return <>{renderContent()}</>
}

export default OthersCardDetail

const Container = styled.div`
  height: 100vh;
`
