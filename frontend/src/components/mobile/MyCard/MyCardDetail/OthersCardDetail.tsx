/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CardType } from '@/types/cardType'
import DetailInfoSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailSection'
import DetailInfoEdit from '@components/mobile/MyAlbum/MyAlbumDetail/DetailInfoEdit'
import DetailCardSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailCardSection'
import DetailBottomSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailBottomSection'
import styled from '@emotion/styled'
import BackArrow from '@/components/shared/BackArrow'
import DetailMapSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailMapSection'
import MemoSection from '@components/mobile/MyAlbum/MyAlbumDetail/MemoSection'
import { ExternalCardType } from '@/types/ExternalCard'
import { useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'

const OthersCardDetail = () => {
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
    return (
      <Container>
        <BackArrow />
        <DetailCardSection
          isRealState={{ value: isReal, setValue: setIsReal }}
          card={selectedCard}
        />
        <DetailInfoSection
          card={selectedCard}
          isEdit={{ value: isEdit, setValue: setIsEdit }}
        />
        <DetailMapSection card={selectedCard} />
        <DetailBottomSection />
        {/*  memo section necesita */}
        {/* <DetailFilter cardId={cardId}/> */}
        <MemoSection card={selectedCard} />
      </Container>
      // 지도 : 수정하기
      // 메모 : 수정하기
    )
  }
  return <>{renderContent()}</>
}

export default OthersCardDetail

const Container = styled.div`
  height: 100vh;
`
