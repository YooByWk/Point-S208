/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CardType } from '@/types/cardType';
import DetailInfoSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailSection';
import DetailInfoEdit from '@components/mobile/MyAlbum/MyAlbumDetail/DetailInfoEdit';
import DetailCardSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailCardSection';
import DetailBottomSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailBottomSection';
import styled from '@emotion/styled';
import BackArrow from '@/components/shared/BackArrow';
import DetailMapSection from '@components/mobile/MyAlbum/MyAlbumDetail/DetailMapSection';
import DetailFilter from './DetailFilter';
import MemoSection from '@components/mobile/MyAlbum/MyAlbumDetail/MemoSection'
import { useFetchCardDetail } from '@/hooks/useFetchCardDetail';
import { useQuery } from "@tanstack/react-query"
import { ExternalCardType } from '@/types/ExternalCard';

const AlbumCardDetail = () => {
  const params = useParams()
  const userId: number = Number(params.userId)
  const cardId: number = Number(params.cardId)
  const locationState : CardType = useLocation().state.cardInfo
  const [card, setCard] = useState<CardType>(locationState)
  const [isEdit, setIsEdit] = useState(false)
  const [isReal, setIsReal] = useState(true)
  const teamAlbumId = params?.teamAlbumId ? Number(params.teamAlbumId) : undefined
  
  const fetchCardQuery = useFetchCardDetail({cardId, teamAlbumId: teamAlbumId? teamAlbumId : undefined})
  console.log('cardId, teamAlbumId: ', cardId, teamAlbumId);
  // 팀 앨범이라면 팀 앨범 카드 정보 가져오고, 아니라면 개인 앨범 카드 정보 가져오기...
  const cardInfo: CardType | ExternalCardType = fetchCardQuery?.data_body || []
  console.log(cardInfo, 'cardInfo')
  
  const renderContent = () => {
    if (isEdit) return <DetailInfoEdit isEdit={{value: isEdit, setValue: setIsEdit}} card={cardInfo} />
    return (
      <Container>
        <BackArrow/>
        <DetailCardSection isRealState={{value: isReal, setValue:setIsReal}} card={cardInfo}  />
        <DetailInfoSection card={cardInfo} isEdit={{value: isEdit, setValue: setIsEdit}}/>
        <DetailMapSection card={cardInfo} />
        <DetailBottomSection />
        {/*  memo section necesita */}
        <DetailFilter cardId={cardInfo.cardId}/>
        <MemoSection card={cardInfo}/>
      </Container>
      // 지도 : 수정하기 
      // 메모 : 수정하기
    )
  }
  return <>{renderContent()}</>
};

export default AlbumCardDetail;

const Container = styled.div`
  height: 100dvh;
`