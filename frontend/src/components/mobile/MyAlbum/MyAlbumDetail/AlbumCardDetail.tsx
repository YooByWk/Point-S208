/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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


const AlbumCardDetail = () => {
  const params = useParams()
  const userId: number = Number(params.userId)
  const cardId: number = Number(params.cardId)
  const locationState : CardType = useLocation().state.cardInfo
  const [card, setCard] = useState<CardType>(locationState)
  const [isEdit, setIsEdit] = useState(false)
  const [isReal, setIsReal] = useState(true)
  console.log(cardId)
  console.log(card)
  const renderContent = () => {
    if (isEdit) return <DetailInfoEdit isEdit={{value: isEdit, setValue: setIsEdit}} card={card} />
    return (
      <Container>
        <BackArrow/>
        <DetailCardSection isRealState={{value: isReal, setValue:setIsReal}} card={card}  />
        <DetailInfoSection card={card} isEdit={{value: isEdit, setValue: setIsEdit}}/>
        <DetailMapSection card={card} />
        <DetailBottomSection />
        {/*  memo section necesita */}
        <DetailFilter cardId={cardId}/>
        <MemoSection card={card}/>
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