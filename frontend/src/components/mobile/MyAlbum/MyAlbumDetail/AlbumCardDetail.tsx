/** @jsxImportSource @emotion/react */
import Flex from '@/components/shared/Flex'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';



const AlbumCardDetail = () => {
  const params = useParams()
  const userId: number = Number(params.userId)
  const cardId: number = Number(params.cardId)
  
  
  return (
    <div>
      <p>카드 상세</p>      
      
    </div>
  );
};

export default AlbumCardDetail;