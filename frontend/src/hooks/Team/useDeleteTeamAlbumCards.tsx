import { deleteTeamCards } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { deleteTeamCardArrayType } from '@/types/TeamListType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

export const useDeleteTeamAlbumCards = () => {
  const selectedAlbumId = useRecoilValue(selectedTeamAlbumIdState)
    .teamAlbumId as number
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteTeamCards'],
    mutationFn: ({
      userId,
      cardIdArray,
      teamAlbumId,
    }: deleteTeamCardArrayType) =>
      deleteTeamCards({
        userId: userId as number,
        cardIdArray: cardIdArray,
        teamAlbumId: teamAlbumId as number,
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
