import { deleteTeamCard } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { userState } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

export const useDeleteTeamAlbumCard = () => {
  const userId = useRecoilValue(userState).userId
  const selectedAlbumId = useRecoilValue(selectedTeamAlbumIdState)
    .teamAlbumId as number
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteTeamCard'],
    mutationFn: ({
      cardId,
      teamAlbumId,
    }: {
      cardId: number
      teamAlbumId: number
    }) =>
      deleteTeamCard({
        userId: userId as number,
        cardId: cardId,
        teamAlbumId: teamAlbumId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchTeamCardsList', selectedAlbumId, 0],
      })
    },
    onError: error => {
      console.log('삭제 실패', error)
      window.alert('삭제에 실패했습니다. 다시 시도해주세요.')
    },
  })

  return mutation
}
