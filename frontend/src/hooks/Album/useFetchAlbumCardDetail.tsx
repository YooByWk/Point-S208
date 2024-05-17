import { useQuery } from '@tanstack/react-query'
import { fetchAlbumCardDetail } from '@/apis/album'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'

export const useFetchAlbumCardDetail = ({
  cardId,
  teamAlbumId,
}: {
  cardId: number
  teamAlbumId?: number | undefined
}) => {
  const userId = useRecoilValue(userState).userId

  const { data } = useQuery({
    queryKey: ['fetchAlbumCardDetail', userId, cardId],
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is not available')
      }
      return fetchAlbumCardDetail(userId, cardId)
    },
    enabled: !teamAlbumId,
  })
  return data
}
