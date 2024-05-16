import {useFetchTeamCardDetail} from '@/hooks/Team/useFetchTeamCardDetail'
import { useFetchAlbumCardDetail } from '@/hooks/Album/useFetchAlbumCardDetail';

export const useFetchCardDetail = ({teamAlbumId, cardId}: {teamAlbumId?: number | undefined,  cardId: number}) => {
  const teamCardDetail = useFetchTeamCardDetail({cardId, teamAlbumId});
  const albumCardDetail = useFetchAlbumCardDetail( {cardId,teamAlbumId});
  
  // teamAlbumId가 있으면 teamCardDetail 반환.  teamAlbumId가 없는 경우 albumCardDetail을 반환
  return teamAlbumId !== undefined ? teamCardDetail : albumCardDetail;
};
