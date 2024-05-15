import {useFetchTeamCardDetail} from '@/hooks/Team/useFetchTeamCardDetail'
import { useFetchAlbumCardDetail } from '@/hooks/Album/useFetchAlbumCardDetail';

export const useFetchCardDetail = ({teamAlbumId, cardId}: {teamAlbumId?: number | undefined,  cardId: number}) => {
  console.log('들어온 것 확인 : useFetchCardDetail: ' , teamAlbumId, cardId)
  const teamCardDetail = useFetchTeamCardDetail({cardId, teamAlbumId});
  const albumCardDetail = useFetchAlbumCardDetail( {cardId,teamAlbumId});
  // teamAlbumId가 있으면 teamCardDetail을, 없으면 albumCardDetail을 반환하게
  return teamAlbumId !== undefined ? teamCardDetail : albumCardDetail;
};
