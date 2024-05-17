/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardType } from '@/types/cardType'
import DetailInfoSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailSection'
import DetailInfoEdit from '@components/mobile/MyAlbum/MyAlbumDetail/DetailInfoEdit'
import DetailCardSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailCardSection'
import DetailBottomSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailBottomSection'
import styled from '@emotion/styled'
import BackArrow from '@/components/shared/BackArrow'
import DetailMapSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailMapSection'
import MemoSection from '@components/mobile/MyAlbum/MyAlbumDetail/MemoSection'
import { useFetchCardDetail } from '@/hooks/useFetchCardDetail'
import { ExternalCardType } from '@/types/ExternalCard'
import Spacing from '@/components/shared/Spacing'

const AlbumCardDetail = () => {
  const params = useParams()
  const cardId: number = Number(params.cardId)
  const [isEdit, setIsEdit] = useState(false)
  const [isReal, setIsReal] = useState(true)
  const teamAlbumId = params?.teamAlbumId
    ? Number(params.teamAlbumId)
    : undefined

  const fetchCardQuery = useFetchCardDetail({
    cardId,
    teamAlbumId: teamAlbumId ? teamAlbumId : undefined,
  })
  // 팀 앨범이라면 팀 앨범 카드 정보, 아니라면 개인 앨범 카드 정보
  const cardInfo: CardType | ExternalCardType = fetchCardQuery?.data_body || []

  const scrollPosition = useRef(window.scrollY)

  useEffect(() => {
    window.scrollTo(0, 0)

    const saveScrollPosition = () => {
      scrollPosition.current = window.scrollY
    }

    window.addEventListener('scroll', saveScrollPosition)

    return () => {
      // 컴포넌트가 언마운트될 때 이전 스크롤 위치로 돌아갑니다.
      window.removeEventListener('scroll', saveScrollPosition)
      window.scrollTo(0, scrollPosition.current)
    }
  }, [])

  const renderContent = () => {
    if (isEdit)
      return (
        <DetailInfoEdit
          isEdit={{ value: isEdit, setValue: setIsEdit }}
          card={cardInfo}
        />
      )
    return (
      <Container>
        <BackArrow />
        <Spacing size={20} />
        <DetailCardSection
          isRealState={{ value: isReal, setValue: setIsReal }}
          card={cardInfo}
        />
        <DetailInfoSection
          card={cardInfo}
          isEdit={{ value: isEdit, setValue: setIsEdit }}
        />
        <DetailMapSection card={cardInfo} />
        <DetailBottomSection card={cardInfo} />
        <MemoSection card={cardInfo} />
      </Container>
    )
  }
  return <>{renderContent()}</>
}

export default AlbumCardDetail

const Container = styled.div`
  height: 100dvh;
`
