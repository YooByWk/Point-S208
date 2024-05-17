import { editMyAlbumMemo } from '@/apis/album'
import { editTeamAlbumMemo } from '@/apis/team'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEditAlbumMemo = ({
  userId,
  teamAlbumId,
  cardId,
  data,
}: {
  userId: number
  teamAlbumId?: number
  cardId: number
  data: { memo: string }
}) => {
  const queryClient = useQueryClient()
  const mutationFn = teamAlbumId
    ? (data: { memo: string }) =>
        editTeamAlbumMemo({ userId, teamAlbumId, cardId, data })
    : (data: { memo: string }) => editMyAlbumMemo({ userId, cardId, data })
  const onSuccess = () => {
    teamAlbumId
      ? queryClient.invalidateQueries({
          queryKey: ['fetchTeamCardsList', teamAlbumId, 0],
        })
      : queryClient.invalidateQueries({ queryKey: ['fetchMyAlbum', userId, 0] })
  }

  const mutation = useMutation({
    mutationKey: teamAlbumId ? ['editTeamAlbumMemo'] : ['editAlbumMemo'],
    mutationFn: mutationFn,
    onSuccess: onSuccess,
  })

  return mutation
}
