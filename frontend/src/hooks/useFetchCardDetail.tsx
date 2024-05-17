import { useFetchTeamCardDetail } from '@/hooks/Team/useFetchTeamCardDetail'
import { useFetchAlbumCardDetail } from '@/hooks/Album/useFetchAlbumCardDetail'

export const useFetchCardDetail = ({
  teamAlbumId,
  cardId,
}: {
  teamAlbumId?: number | undefined
  cardId: number
}) => {
  const teamCardDetail = useFetchTeamCardDetail({ cardId, teamAlbumId })
  const albumCardDetail = useFetchAlbumCardDetail({ cardId, teamAlbumId })

  return teamAlbumId !== undefined ? teamCardDetail : albumCardDetail
}
